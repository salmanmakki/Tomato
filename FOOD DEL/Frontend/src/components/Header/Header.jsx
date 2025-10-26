import './Header.css'

const Header = ({ onViewMenu }) => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from diverse menu featuring a delectable array of dishes crafted with the finest ingridient and culnary experties. our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <button onClick={onViewMenu}>View Menu</button>
      </div>
    </div>
  )
}

export default Header
