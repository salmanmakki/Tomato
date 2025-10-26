import './Navbar.css'
import { assets } from '../../assets/assets';
import { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { FiSearch, FiShoppingCart, FiUser, FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import Sidebar from '../Sidebar/Sidebar';

const Navbar = ({setShowLogin, onSearch}) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Initialize theme from localStorage and apply
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const initial = saved === 'dark' ? 'dark' : 'light';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const applyTheme = (next) => {
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };
  const toggleTheme = () => applyTheme(theme === 'light' ? 'dark' : 'light');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
      setShowSearch(false);
      // Scroll to menu section after search
      const menuSection = document.getElementById('explore-menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar && overlay) {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    }
  };

  const closeSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  };

  return (
    <>
      <div className='navbar'>
      <Link to='/'>
        <picture>
          <source media="(max-width: 750px)" srcSet={assets.logo_mobile} />
          <img src={assets.logo} alt="" className='logo' />
        </picture>
      </Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
          <div className="search-container" ref={searchRef}>
            {!showSearch && (
              <FiSearch 
                aria-label="Search"
                onClick={() => setShowSearch(true)} 
                style={{ cursor: 'pointer' }}
              />
            )}
            {showSearch && (
              <form className="search-bar" onSubmit={handleSearch}>
                <input 
                  type="text" 
                  placeholder="Search food..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit" aria-label="Submit search">
                  <FiSearch />
                </button>
              </form>
            )}
          </div>
          {/* Theme switch (pill with sliding knob) - hidden on mobile */}
          <button
            type="button"
            className={`theme-switch ${theme} desktop-only`}
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            onClick={toggleTheme}
          >
            <span className="track">
              <span className="icon moon"><FiMoon /></span>
              <span className="icon sun"><FiSun /></span>
            </span>
            <span className="knob" />
          </button>
          <div className="navbar-search-icon">
          <Link to='/cart' aria-label='Cart'><FiShoppingCart /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token ? null : (
          <div className='navbar-profile'>
            <FiUser />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
        {!token && <button className="desktop-only" onClick={()=>setShowLogin(true)}>sign in</button>}
        <button className="hamburger-menu" onClick={toggleSidebar}>
          <FiMenu />
        </button>
      </div>
    </div>
    
    {/* Overlay */}
    <div className="sidebar-overlay" onClick={closeSidebar}></div>
    
    {/* Sidebar */}
    <Sidebar 
      setShowLogin={setShowLogin} 
      theme={theme} 
      toggleTheme={toggleTheme}
    />
    </>
  )
}

export default Navbar
