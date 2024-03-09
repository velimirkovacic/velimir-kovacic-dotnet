import React, { useState } from 'react';
import { backend_url } from '../../constants/constants';

function RegisterPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    // Prepare the data to be sent
    const data = {
        name: name,
        surname: surname,
        email: email,
        password: password,
        profilePictureUrl: profilePicture
    };
    
    try {
        // Send a POST request to the /students/register endpoint
        const response = await fetch(backend_url + '/register/student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });
    
        // Check if the request was successful
        if (response.ok) {
            console.log('Student registered successfully');
        } else {
            console.error('Failed to register student');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    };

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