import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { handleLogin } from '../../api/AuthApi';

function LoginPage() {
  const [showStudentLogIn, setShowStudentLogIn] = useState(true);

  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');

  const [professorEmail, setProfessorEmail] = useState('');
  const [professorPassword, setProfessorPassword] = useState('');

  function handleStudentSubmit(event) {
    event.preventDefault();
    const data = {
        email: studentEmail,
        password: studentPassword
      };
    handleLogin(data, "student");
  }

  function handleProfessorSubmit(event) {
    event.preventDefault();
    const data = {
        email: professorEmail,
        password: professorPassword
      };
    handleLogin(data, "professor");
  }

  return (
      <>
        <Button variant="contained" onClick={() => setShowStudentLogIn(!showStudentLogIn)}>
          Prijavi se kao {showStudentLogIn ? 'professor' : 'student'}?
        </Button>
        <Link to="/register">
          <Button variant="contained">Registriraj se</Button>
        </Link>
      {showStudentLogIn ? (
          <div>
            <h1>Prijava studenta</h1>
            <form onSubmit={handleStudentSubmit}>
              <div>
                <label htmlFor="email">E-mail adresa</label>
                <input type="text" id="email" placeholder="Email" value={studentEmail} onChange={e => setStudentEmail(e.target.value)} />
      
                <label htmlFor="password">Lozinka</label>
                <input type="password" id="password" placeholder="Lozinka" value={studentPassword} onChange={e => setStudentPassword(e.target.value)} />
              </div>
              <button type="submit">Prijavi se</button>
              <button type="button" onClick={() => {setStudentEmail(''); setStudentPassword('');}}>Odbaci</button>
            </form>
          </div>) : (
              <div>
                <h1>Prijava profesora</h1>
                <form onSubmit={handleProfessorSubmit}>
                  <div>
                    <label htmlFor="email">E-mail adresa</label>
                    <input type="text" id="email" placeholder="Email" value={professorEmail} onChange={e => setProfessorEmail(e.target.value)} />

                    <label htmlFor="password">Lozinka</label>
                    <input type="password" id="password" placeholder="Lozinka" value={professorPassword} onChange={e => setProfessorPassword(e.target.value)} />
                  </div>
                  <button type="submit">Prijavi se</button>
                  <button type="button" onClick={() => {setProfessorEmail(''); setProfessorPassword('');}}>Odbaci</button>
                </form>
              </div>
          )
      }
    </>
  );
}

export default LoginPage;