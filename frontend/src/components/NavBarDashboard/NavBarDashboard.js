import { Link } from 'react-router-dom';
import './NavBarDashboard.css';

const NavBarDashboard = () => {

    return (
        <nav className="navbar">
            <div className='navbar-menu '>
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/about" className="navbar-item">About Us</Link>
                <Link to="/contact" className="navbar-item">Contact</Link>
                <Link to="/service" className="navbar-item">Service</Link>
            </div>
        </nav>
    );
};

export default NavBarDashboard;