import './App.css'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <p className="eyebrow">Card catalog</p>
        <h1 id="login-title">Welcome back.</h1>
        <p className="intro">Sign in to keep your collection close.</p>

        <LoginForm />

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
