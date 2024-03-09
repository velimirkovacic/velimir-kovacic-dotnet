import React, { useState } from 'react';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { backend_url } from '../../constants/constants';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();    
    
    // Prepare the data to be sent
    const data = {
        email: email,
        password: password
      };
  
      try {
        // Send a POST request to the /login/student endpoint
        const response = await fetch(backend_url + '/login/student', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        // Check if the request was successful
        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
        } else {
          console.error('Failed to login');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      };

    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div>
      <h1>Prijava studenta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail adresa</label>
          <input type="text" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

          <label htmlFor="password">Lozinka</label>
          <input type="password" id="password" placeholder="Lozinka" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Prijavi se</button>
        <button type="button" onClick={() => {setEmail(''); setPassword('');}}>Odbaci</button>
      </form>
        <Link to="/register">
            <Button variant="contained">Registriraj se</Button>
        </Link>
    </div>
  );
}

export default LoginPage;