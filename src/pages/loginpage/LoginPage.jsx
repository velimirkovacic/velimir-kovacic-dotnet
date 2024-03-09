import React, { useState } from 'react';
import { Button } from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
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