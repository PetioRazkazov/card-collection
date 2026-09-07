import { useAppDispatch } from '../store/store'
import { logout } from '../store/authSlice'

function Dashboard({ auth }: { auth: { user: string | null; accessToken: string | null } }) {
  const dispatch = useAppDispatch()

  function handleLogout() {
    dispatch(logout())
  }

  return (
    <main>
      <h1>Welcome back, {auth.user}</h1>
      <p>Collection summary</p>
      <button type="button" onClick={handleLogout}>Log out</button>
    </main>
  )
}

export default Dashboard
