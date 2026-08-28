import { useState } from 'react'
import type { FormEvent } from 'react'
import '../App.css'
import { validateLogin } from '../validation'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })


  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  
    const newErrors = validateLogin(email, password)
    setErrors(newErrors)
    if (!newErrors.email && !newErrors.password) {
      setIsSubmitted(true)
    }
  }

  return (
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              aria-describedby="email-error"
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
              aria-describedby="password-error"
              name="password"
              type="password"
              minLength={8}
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setIsSubmitted(false)
              }}
              required
            />
          </div>

          <div className="error-messages">
            {errors.email && (
              <p id="email-error" className="error-message" role="alert">
                {errors.email}
              </p>
            )}
            {errors.password && (
              <p id="password-error" className="error-message" role="alert">
                {errors.password}
              </p>
            )}
          </div>
          <button type="submit">Sign in</button>
          {isSubmitted && (
            <p className="form-message" role="status">
              The API login will connect here next.
            </p>
          )}
        </form>
  )
}

export default LoginForm
