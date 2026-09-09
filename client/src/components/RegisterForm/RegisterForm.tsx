import { useState, type FormEvent } from 'react'
import './registerform.css'
import { validateRegister } from '../../validation'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { clearError, registerFailure, registerSuccess } from '../../store/registerSlice'

function RegisterForm({
  onRegistered,
  onBackToLogin,
}: {
  onRegistered: () => void
  onBackToLogin: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const dispatch = useAppDispatch()
  const userError = useAppSelector((state) => state.user.error)

  function handleRegisterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newErrors = validateRegister(email, password, passwordConfirm)
    setErrors(newErrors)

    if (!newErrors.email && !newErrors.password && !newErrors.passwordConfirm) {
      dispatch(clearError())
      dispatch(registerSuccess({ user: email, password }))
      setIsSubmitted(true)
      onRegistered()
      return
    }

    dispatch(registerFailure('Registration failed. Please check your input and try again.'))
  }

  return (
    <main className="register-page">
      <section className="register-panel" aria-labelledby="register-title">
        <p className="register-eyebrow">Card catalog</p>
        <h1 id="register-title">Create your collection.</h1>
        <p className="register-intro">Make an account to keep every card in one place.</p>

        <form onSubmit={handleRegisterSubmit} noValidate>
          <div className="field">
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              aria-describedby="register-email-error"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              aria-describedby="register-password-error"
              name="password"
              type="password"
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="register-password-confirm">Confirm password</label>
            <input
              id="register-password-confirm"
              aria-describedby="register-password-confirm-error"
              name="passwordConfirm"
              type="password"
              minLength={8}
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              required
            />
          </div>

          <div className="error-messages">
            {errors.email && (
              <p id="register-email-error" className="error-message" role="alert">
                {errors.email}
              </p>
            )}
            {errors.password && (
              <p id="register-password-error" className="error-message" role="alert">
                {errors.password}
              </p>
            )}
            {errors.passwordConfirm && (
              <p id="register-password-confirm-error" className="error-message" role="alert">
                {errors.passwordConfirm}
              </p>
            )}
            {userError && (
              <p className="error-message" role="alert">
                {userError}
              </p>
            )}
          </div>

          <button type="submit" disabled={isSubmitted}>Register</button>
          <button type="button" className="secondary-button" onClick={() => {
            dispatch(clearError())
            onBackToLogin()
          }}>
            Already have an account? Sign in
          </button>
        </form>
      </section>
    </main>
  )
}

export default RegisterForm
