import React, { useState } from 'react';

function RegisterPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(`Name: ${name}, Surname: ${surname}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}, Profile Picture: ${profilePicture}`);
  };

  const handleImageChange = (event) => {
    setProfilePicture(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <h1>Registracija studenta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Ime</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

          <label htmlFor="surname">Prezime</label>
          <input type="text" id="surname" value={surname} onChange={e => setSurname(e.target.value)} />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

          <label htmlFor="password">Lozinka</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

          <label htmlFor="confirmPassword">Potvrdi Lozinku</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

          <label htmlFor="profilePicture">Profilna fotografija</label>
          <input type="file" id="profilePicture" onChange={handleImageChange} />
        </div>
        <button type="submit">Register</button>
        <button type="button" onClick={() => {setName(''); setSurname(''); setEmail(''); setPassword(''); setConfirmPassword(''); setProfilePicture(null);}}>Odbaci</button>
      </form>
    </div>
  );
}

export default RegisterPage;