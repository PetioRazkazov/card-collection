import express from 'express'
import cors from 'cors'
import { pool } from './db.js'
import { hashPassword, verifyPassword } from './utils/password.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {}

  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.',
    })
  }

  try {
    const user = await pool.query(
      'SELECT email, password_hash FROM users WHERE email = $1',
      [email.trim().toLowerCase()],
    )

    if (user.rows.length === 0) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      })
    }

    const verifiedPassword = await verifyPassword(password, user.rows[0].password_hash)
    if (!verifiedPassword) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      })
    }

    return res.status(200).json({
      user: { email: user.rows[0].email },
      accessToken: 'demo-token',
    })
  } catch (error) {
    console.error('Login failed:', error)
    return res.status(500).json({
      message: 'Unable to process login.',
    })
  }
})

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')

    return res.status(200).json({
      status: 'ok',
      database: 'connected',
    })
  } catch (error) {
    console.error('Database connection failed:', error)

    return res.status(500).json({
      status: 'error',
      database: 'disconnected',
    })
  }
})

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body ?? {}

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    password.length < 8
  ) {
    return res.status(400).json({
      message: 'A valid email and a password of at least 8 characters are required.',
    })
  }

  const normalizedEmail = email.trim().toLowerCase()

  try {
    const passwordHash = await hashPassword(password)
    await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2)',
      [normalizedEmail, passwordHash],
    )

    return res.status(201).json({
      status: 'User registered successfully',
      user: { email: normalizedEmail },
    })
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === '23505') {
      return res.status(409).json({
        message: 'An account with that email already exists.',
      })
    }

    console.error('Registration failed:', error)

    return res.status(500).json({
      message: 'Unable to create account.',
    })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
