import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router'
import Cookies from 'js-cookie'
import { auth, googleProvider } from '../../firebase/firebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import './index.css'

const validUsers = [
  { username: 'admin', password: 'admin123' },
  { username: 'manoj', password: 'jami@123' },
]

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault()
    const user = validUsers.find(
      (user) => user.username === username && user.password === password
    )
    if (user) {
      Cookies.set('jwt_token', 'dummy_token_123', { expires: 7 })
      navigate('/', { replace: true })
    } else {
      setErrorMsg('Invalid credentials')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()
      Cookies.set('jwt_token', token, { expires: 7 })
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Google Sign-In Failed:', error.message)
      setErrorMsg('Google Sign-In Failed')
    }
  }

  if (Cookies.get('jwt_token')) return <Navigate to="/" />

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submitForm}>
        <h1 className="brand-name">Adalene</h1>
        <h2 className="login-heading">Login to Your Account</h2>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        {errorMsg && <p className="error">{errorMsg}</p>}

        <button type="submit">Login</button>

        <div className="or-divider">OR</div>

        <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" class="g-image"/>
          Sign in with Google
        </button>
      </form>
    </div>
  )
}

export default LoginForm
