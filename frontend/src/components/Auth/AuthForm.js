import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Swal from 'sweetalert2';
import './AuthForm.css';

function AuthForm() {
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isRegister ? '/auth/register' : '/auth/login';
            const data = isRegister ? { name, email, password } : { email, password };
            const response = await api.post(endpoint, data);
            console.log(response.data);
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
                const token = response.data.token; // Suponiendo que el token se devuelve en la respuesta
                localStorage.setItem('token', token);
                navigate('/transactions'); // Redirigir a la página de transacciones después de un inicio de sesión exitoso
            }
        } catch (error) {
            console.error(error);
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
                    onChange={(e) => setEmail(e.target.value)}
                />
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