import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBarDashboard.css';

const NavBarDashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                Analista Financiero
            </div>
            <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/about" className="navbar-item">About Us</Link>
                <Link to="/contact" className="navbar-item">Contact</Link>
                <Link to="/service" className="navbar-item">Service</Link>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </nav>
    );
};

export default NavBarDashboard;