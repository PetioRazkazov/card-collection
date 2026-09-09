import { useState } from 'react'
import type { FormEvent } from 'react'
import './loginform.css'
import { validateLogin } from '../../validation'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { loginFailure, loginStart, loginSuccess } from '../../store/authSlice'
import axios from 'axios'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const dispatch = useAppDispatch()
  const authStatus = useAppSelector((state) => state.auth.status)
  const authError = useAppSelector((state) => state.auth.error)
  const loginUrl = 'http://localhost:3000/api/auth/login'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newErrors = validateLogin(email, password)
    setErrors(newErrors)

    if (!newErrors.email && !newErrors.password) {
      dispatch(loginStart())


      try {
        const response = await axios.post(loginUrl, { email, password })
        const { user, accessToken } = response.data

        dispatch(loginSuccess({
          accessToken,
          user: user.email,
        }))
      } catch (error) {
        console.error('Login failed:', error)
        dispatch(loginFailure('Login failed. Please check your credentials and try again.'))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="login-email">Email address</label>
        <input
          id="login-email"
          aria-describedby="login-email-error"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
          }}
          required
        />
      </div>

      <div className="field">
        <div className="label-row">
          <label htmlFor="login-password">Password</label>
          <a href="#forgot-password">Forgot password?</a>
        </div>
        <input
          id="login-password"
          aria-describedby="login-password-error"
          name="password"
          type="password"
          minLength={8}
          autoComplete="current-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
          required
        />
      </div>

      <div className="error-messages">
        {errors.email && (
          <p id="login-email-error" className="error-message" role="alert">
            {errors.email}
          </p>
        )}
        {errors.password && (
          <p id="login-password-error" className="error-message" role="alert">
            {errors.password}
          </p>
        )}
        {authError && (
          <p className="error-message" role="alert">
            {authError}
          </p>
        )}
      </div>

      <button type="submit" disabled={authStatus === 'loading'}>
        {authStatus === 'loading' ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}

export default LoginForm
