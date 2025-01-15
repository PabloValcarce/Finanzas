import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './NavBarTransaction.css';

const NavBarTransaction = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Borra la variable de local storage
        navigate('/'); // Redirige al Dashboard
    };

    return (
        <nav className="navbar-transaction">
            <div className="navbar-transaction-brand">
                Finanzas
            </div>
            <div className={`navbar-transaction-menu ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/inversion" className="navbar-transaction-item">Inversion</Link>
                <Link to="/ahorro" className="navbar-transaction-item">Ahorro</Link>
                <Link to="/estadisticas" className="navbar-transaction-item">Estadísticas</Link>
                <Link to="/gestion" className="navbar-transaction-item">Gestión</Link>
                <Link to="/configuracion" className="navbar-transaction-item">Configuración</Link>
                <button onClick={handleLogout} className="navbar-transaction-item logout-button">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
            </div>
            <div className="hamburger-transaction" onClick={toggleMenu}>
                <div className="bar-transaction"></div>
                <div className="bar-transaction"></div>
                <div className="bar-transaction"></div>
            </div>
        </nav>
    );
};

export default NavBarTransaction;