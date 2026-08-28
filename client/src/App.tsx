import { FormEvent, useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <p className="eyebrow">Card catalog</p>
        <h1 id="login-title">Welcome back.</h1>
        <p className="intro">Sign in to keep your collection close.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setIsSubmitted(false)
              }}
              required
            />
          </div>

          <div className="field">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <a href="#forgot-password">Forgot password?</a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setIsSubmitted(false)
              }}
              required
            />
          </div>

          <button type="submit">Sign in</button>
          {isSubmitted && (
            <p className="form-message" role="status">
              The API login will connect here next.
            </p>
          )}
        </form>

        <p className="register-prompt">
          New to the collection? <a href="#register">Create an account</a>
        </p>
      </section>

      <aside className="login-art" aria-label="Card collection preview">
        <span className="card-mark">CC</span>
        <p>Every card has a place.</p>
      </aside>
    </main>
  )
}

export default App
