import './index.css';
import {Link} from 'react-router';

export default function Navbar() {
  return (
    <div className="navbar-container">
        <nav className="navbar">
            <div className="">
                <input type="search" placeholder="Search..." className="search-bar" />
            </div>
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
                    <button className="nav-button">Login</button>
                </div>
                <div className="cart">
                    <button className="nav-button">Cart</button>
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
