import './index.css';
import {Link, useLocation } from 'react-router';
import { useState } from 'react';
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router'

export default function Navbar({ onSearch }) {

    const [searchInput, setSearchInput] = useState('');
  const location = useLocation();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (location.pathname === '/products') {
      const event = new CustomEvent('shop-search', { detail: value.toLowerCase() });
      window.dispatchEvent(event);
    }
  };

  const navigate = useNavigate()
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }
 
  return (
    <div className="navbar-container">
        <nav className="navbar">
            
                {location.pathname === '/products' && (
                <input
                    type="search"
                    placeholder="Search..."
                    className="search-bar"
                    value={searchInput}
                    onChange={handleSearch}
                />
                )}  
            
            
            <div className="logo">
                <h1 className="logo-name">Adalene</h1>
            </div>
            <div className="right-bar">
                <div className="icons">
                    <i className="fa-brands fa-facebook-f"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-pinterest-p"></i>
                </div>
                <div className="login">
                    <button
                        type="button"
                        className="login-out"
                        onClick={onClickLogout}
                    >
                        Logout
                    </button>
                </div>
                <div className="cart">
                    <Link to="/cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                    
                   </Link>
                </div>
            </div> 
        </nav>
        <div className="navbar-bottom">
            <div className="navbar-links">
                <Link className="nav-link" to="/">
                    Home
                </Link>
                <Link className="nav-link" to="/products">
                    Products
                </Link>
                <Link className="nav-link">
                    Our Craft
                </Link>
                <Link className="nav-link">
                    Gift Card
                </Link>
                <Link className="nav-link">
                    Contact Us
                </Link> 
                
            </div>
        </div>
    </div>
    
  );
}
