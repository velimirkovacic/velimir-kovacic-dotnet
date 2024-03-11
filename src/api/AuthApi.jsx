import { backend_url } from "../constants/constants";

export const handleLogin = async (data) => {  
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
            console.log(result.token);
            console.log(result.student);

            // Save the token to the local storage
            localStorage.setItem('token', result.token);
            localStorage.setItem('student', JSON.stringify(result.student));
            window.location.href = '/';
        } else {
          console.error('Failed to login');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      };

    console.log(`Email: ${email}, Password: ${password}`);
  };

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    window.location.href = '/';
}