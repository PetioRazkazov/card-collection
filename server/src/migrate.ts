import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { pool } from './db.js'

const migrationsDirectory = path.resolve(process.cwd(), 'migrations')
const direction = process.argv[2]

type Migration = {
  name: string
  filePath: string
}

async function getMigrations(suffix: 'up' | 'down'): Promise<Migration[]> {
  const files = await readdir(migrationsDirectory)

  return files
    .filter((fileName) => fileName.endsWith(`.${suffix}.sql`))
    .sort()
    .map((fileName) => ({
      name: fileName.replace(`.${suffix}.sql`, ''),
      filePath: path.join(migrationsDirectory, fileName),
    }))
}

async function runMigrations() {
  if (direction !== 'up' && direction !== 'down') {
    throw new Error('Choose a migration direction: up or down.')
  }

  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)

    if (direction === 'up') {
      const migrations = await getMigrations('up')
      const appliedResult = await client.query<{ name: string }>(
        'SELECT name FROM schema_migrations',
      )
      const appliedNames = new Set(appliedResult.rows.map((row) => row.name))

      for (const migration of migrations) {
        if (appliedNames.has(migration.name)) {
          continue
        }

        const sql = await readFile(migration.filePath, 'utf8')
        await client.query(sql)
        await client.query(
          'INSERT INTO schema_migrations (name) VALUES ($1)',
          [migration.name],
        )
        console.log(`Applied migration: ${migration.name}`)
      }
    } else {
      const appliedResult = await client.query<{ name: string }>(
        'SELECT name FROM schema_migrations ORDER BY applied_at DESC, name DESC LIMIT 1',
      )
      const latestMigration = appliedResult.rows[0]

      if (!latestMigration) {
        console.log('No migrations to roll back.')
      } else {
        const downMigrations = await getMigrations('down')
        const migration = downMigrations.find(({ name }) => name === latestMigration.name)

        if (!migration) {
          throw new Error(`Missing down migration for ${latestMigration.name}.`)
        }

        const sql = await readFile(migration.filePath, 'utf8')
        await client.query(sql)
        await client.query(
          'DELETE FROM schema_migrations WHERE name = $1',
          [latestMigration.name],
        )
        console.log(`Rolled back migration: ${latestMigration.name}`)
      }
    }

    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

runMigrations().catch((error: unknown) => {
  console.error('Migration failed:', error)
  process.exitCode = 1
})
