import './Sidebar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { FiSun, FiMoon } from 'react-icons/fi'

const Sidebar = ({ setShowLogin, theme, toggleTheme }) => {
  const { token } = useContext(StoreContext)

  const handleMenuClick = () => {
    const sidebar = document.querySelector('.sidebar')
    const overlay = document.querySelector('.sidebar-overlay')
    if (sidebar) sidebar.classList.remove('active')
    if (overlay) overlay.classList.remove('active')
  }

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <Link to="/" onClick={handleMenuClick}>
          <span>Home</span>
        </Link>
        <a href="#explore-menu" onClick={handleMenuClick}>
          <span>Menu</span>
        </a>
        <a href="#app-download" onClick={handleMenuClick}>
          <span>Mobile App</span>
        </a>
        <a href="#footer" onClick={handleMenuClick}>
          <span>Contact Us</span>
        </a>
        
        <div className="sidebar-separator"></div>

        <button
          type="button"
          className={`theme-switch ${theme}`}
          role="switch"
          aria-checked={theme === 'dark'}
          onClick={toggleTheme}
        >
          <span className="track">
            <span className="icon moon"><FiMoon /></span>
            <span className="icon sun"><FiSun /></span>
          </span>
          <span className="knob" />
        </button>

        {!token && (
          <button onClick={() => { setShowLogin(true); handleMenuClick() }} className="sidebar-signin-btn">
            Sign In
          </button>
        )}
      </div>
    </div>
  )
}

export default Sidebar

