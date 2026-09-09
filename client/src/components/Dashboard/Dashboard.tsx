import './dashboard.css'
import { useAppDispatch } from '../../store/store'
import { logout } from '../../store/authSlice'

const cards = [
  { name: 'Solar Drake', rarity: 'Epic', value: '24' },
  { name: 'Moonlit Ranger', rarity: 'Rare', value: '18' },
  { name: 'Ember Warden', rarity: 'Legendary', value: '42' },
]

function Dashboard({ auth }: { auth: { user: string | null; accessToken: string | null } }) {
  const dispatch = useAppDispatch()

  function handleLogout() {
    dispatch(logout())
  }

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Collection dashboard</p>
          <h1>Welcome back, {auth.user}</h1>
        </div>

        <button type="button" className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <section className="dashboard-stats">
        <div className="stat-card">
          <span>Total cards</span>
          <strong>128</strong>
        </div>
        <div className="stat-card">
          <span>Wishlist</span>
          <strong>15</strong>
        </div>
        <div className="stat-card">
          <span>Vault value</span>
          <strong>2.4k</strong>
        </div>
      </section>

      <section className="table-panel">
        <h2>Featured cards</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rarity</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.name}>
                <td>{card.name}</td>
                <td>{card.rarity}</td>
                <td>{card.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default Dashboard
