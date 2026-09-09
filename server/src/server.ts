import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body ?? {}

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.',
    })
  }

  return res.status(200).json({
    user: { email },
    accessToken: 'demo-token',
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
