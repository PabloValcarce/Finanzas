import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Swal from 'sweetalert2';
import './AuthForm.css';

function AuthForm() {
    const [isRegister, setIsRegister] = useState(false); // Mostrar el formulario de inicio de sesión por defecto
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        validateAndSetEmailError(emailValue);
    };

    const validateAndSetEmailError = (email) => {
        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }
        setEmailError('');
        try {
            const endpoint = isRegister ? '/auth/register' : '/auth/login';
            const data = isRegister ? { name, email, password } : { email, password };
            const response = await api.post(endpoint, data);
            if (isRegister) {
                Swal.fire({
                    title: 'Success!',
                    text: 'User registered successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setName('');
                setEmail('');
                setPassword('');
            } else {
                // Asegúrate de que la respuesta contiene el token
             if (response.data.token) {
                const token = response.data.token;
                const userId = response.data.userId;
                
                localStorage.setItem('token', token);
                localStorage.setItem('userId',userId);  // Guarda el token en localStorage

                // Si el token se ha guardado correctamente, navega a /transactions
                navigate('/transactions');
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Login failed, no token received!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Incorrect email or password!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="auth-form">
            <h1>{isRegister ? 'Register' : 'Login'}</h1>
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className={emailError ? 'error-border' : ''}
                />
                {emailError && <p className="error">{emailError}</p>}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Switch to Login' : 'Switch to Register'}
            </button>
        </div>
    );
}

export default AuthForm;