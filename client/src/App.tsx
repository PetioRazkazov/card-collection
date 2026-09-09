import LoginForm from './components/LoginForm/LoginForm'
import Dashboard from './components/Dashboard/Dashboard'
import { useAppSelector } from './store/store'
import RegisterForm from './components/RegisterForm/RegisterForm'
import { useState } from 'react'

function App() {
  const authStatus = useAppSelector((state) => state.auth.status)
  const auth = useAppSelector((state) => state.auth)
  const [redirectToRegister, setRedirectToRegister] = useState(false)
  if (authStatus === 'succeeded' && auth.user) {
    return <Dashboard auth={auth} />
  }
    if (redirectToRegister) {
      return (
        <RegisterForm
          onRegistered={() => setRedirectToRegister(false)}
          onBackToLogin={() => setRedirectToRegister(false)}
        />
      )
  }

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <p className="eyebrow">Card catalog</p>
        <h1 id="login-title">Welcome back.</h1>
        <p className="intro">Sign in to keep your collection close.</p>

        <LoginForm />

        <p className="register-prompt">
          New to the collection? <a href="#register" onClick={() => setRedirectToRegister(true)}>Create an account</a>
        </p>
      </section>

      <aside className="login-art" aria-label="Card collection preview">
        <span className="card-mark">For the love of the Game</span>
        <p>Every card has a place.</p>
      </aside>
    </main>
  )
}

export default App
