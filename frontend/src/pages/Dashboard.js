import React, { useEffect } from 'react';

function Dashboard() {
    useEffect(() => {
        api.get('/test').then((response) => {
            console.log(response.data);
        });
    },[]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido al Gestor Financiero Personal</p>
    </div>
  );
}

export default Dashboard;
