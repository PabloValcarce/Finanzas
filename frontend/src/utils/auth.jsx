// utils/auth.js

export const isTokenValid = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return false;  // Si no hay token, no está autenticado
    }

    const decodedToken = decodeToken(token);
    return decodedToken && decodedToken.exp > Date.now() / 1000;
};

export const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
};
