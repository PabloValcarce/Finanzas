import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function useAuth() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Si no hay token, redirige a la página de login
    if (!token) {
      navigate("/");  
      return;
    }

    // Verificar si el token ha expirado
    const decodedToken = decodeToken(token);
    const currentTime = Date.now() / 1000; // Obtener el tiempo actual en segundos

    if (decodedToken && decodedToken.exp < currentTime) {
      // Si el token ha expirado, eliminarlo del localStorage y redirigir al login
      localStorage.removeItem('token');
      navigate("/");
    }
  }, [navigate]);

  return null;  
}

export default useAuth;

function decodeToken(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  
  return JSON.parse(jsonPayload);
}
