import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function useAuth() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate("/");  
    }
  }, [navigate]);  

  return null;  
}

export default useAuth;
