import React, { useState } from "react";
import { Button } from "@mui/material";
import { handlerRegister } from "../../api/AuthApi";

function RegisterPage() {
  const [showStudentForm, setShowStudentForm] = useState(true);

  const [studentName, setStudentName] = useState("");
  const [studentSurname, setStudentSurname] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentConfirmPassword, setStudentConfirmPassword] = useState("");
  const [studentProfilePicture, setStudentProfilePicture] = useState(null);

  const [professorName, setProfessorName] = useState("");
  const [professorSurname, setProfessorSurname] = useState("");
  const [professorEmail, setProfessorEmail] = useState("");
  const [professorPassword, setProfessorPassword] = useState("");
  const [professorConfirmPassword, setProfessorConfirmPassword] = useState("");
  const [professorProfilePicture, setProfessorProfilePicture] = useState(null);

  const handleStudentSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to be sent
    const studentData = new FormData();
    studentData.append('name', studentName);
    studentData.append('surname', studentSurname);
    studentData.append('email', studentEmail);
    studentData.append('password', studentPassword);
    studentData.append('confirmPassword', studentConfirmPassword);
    studentData.append('profilePicture', studentProfilePicture);

    console.log(studentData);

    // Send the data to the server
    handlerRegister(studentData, "student");
  };

  const handleProfessorSubmit = async (event) => {
    event.preventDefault();

    const professorData = new FormData();
    professorData.append('name', professorName);
    professorData.append('surname', professorSurname);
    professorData.append('email', professorEmail);
    professorData.append('password', professorPassword);
    professorData.append('confirmPassword', professorConfirmPassword);
    professorData.append('profilePicture', professorProfilePicture);

    console.log(professorData);

    handlerRegister(professorData, "professor");
  };

  const handleStudentImageChange = (event) => {
    setStudentProfilePicture(event.target.files[0]);
  };

  const handleProfessorImageChange = (event) => {
    setProfessorProfilePicture(event.target.files[0]);
  };

  return (
    <>
    <Button variant="contained" onClick={() => setShowStudentForm(!showStudentForm)}>
      Registriraj se kao {showStudentForm ? 'professor' : 'student'}?
    </Button>
    {showStudentForm ? (
      <div>
        <h1>Registracija studenta</h1>
        <form onSubmit={handleStudentSubmit}>
          <div>
            <label htmlFor="name">Ime</label>
            <input
              type="text"
              id="name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />

            <label htmlFor="surname">Prezime</label>
            <input
              type="text"
              id="surname"
              value={studentSurname}
              onChange={(e) => setStudentSurname(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
            />

            <label htmlFor="password">Lozinka</label>
            <input
              type="password"
              id="password"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword">Potvrdi Lozinku</label>
            <input
              type="password"
              id="confirmPassword"
              value={studentConfirmPassword}
              onChange={(e) => setStudentConfirmPassword(e.target.value)}
            />

            <label htmlFor="profilePicture">Profilna fotografija</label>
            <input type="file" id="profilePicture" onChange={handleStudentImageChange} />
          </div>
          <button type="submit">Register</button>
          <button
            type="button"
            onClick={() => {
              setStudentName("");
              setStudentSurname("");
              setStudentEmail("");
              setStudentPassword("");
              setStudentConfirmPassword("");
              setStudentProfilePicture(null);
            }}
          >
            Odbaci
          </button>
        </form>
      </div>
      ) : (
      <div>
        <h1>Registracija profesora</h1>
        <form onSubmit={handleProfessorSubmit}>
          <div>
            <label htmlFor="name">Ime</label>
            <input
              type="text"
              id="name"
              value={professorName}
              onChange={(e) => setProfessorName(e.target.value)}
            />

            <label htmlFor="surname">Prezime</label>
            <input
              type="text"
              id="surname"
              value={professorSurname}
              onChange={(e) => setProfessorSurname(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={professorEmail}
              onChange={(e) => setProfessorEmail(e.target.value)}
            />

            <label htmlFor="password">Lozinka</label>
            <input
              type="password"
              id="password"
              value={professorPassword}
              onChange={(e) => setProfessorPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword">Potvrdi Lozinku</label>
            <input
              type="password"
              id="confirmPassword"
              value={professorConfirmPassword}
              onChange={(e) => setProfessorConfirmPassword(e.target.value)}
            />

            <label htmlFor="profilePicture">Profilna fotografija</label>
            <input type="file" id="profilePicture" onChange={handleProfessorImageChange} />
          </div>
          <button type="submit">Register</button>
          <button
            type="button"
            onClick={() => {
              setProfessorName("");
              setProfessorSurname("");
              setProfessorEmail("");
              setProfessorPassword("");
              setProfessorConfirmPassword("");
              setProfessorProfilePicture(null);
            }
          }
        >
        Odbaci
        </button>
      </form>
      </div>
      )}
    </>
    );
  }

  export default RegisterPage;
