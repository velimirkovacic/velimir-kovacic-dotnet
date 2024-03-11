import { backend_url } from "../constants/constants";

export const handleLogin = async (data, user) => {  
      try {
        // Send a POST request to the /login/student endpoint
        const response = await fetch(backend_url + '/login/' + user, {
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
            localStorage.setItem(user, JSON.stringify(result.student));
            window.location.href = '/';
        } else {
          console.error('Failed to login');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      };

    console.log(`Email: ${email}, Password: ${password}`);
  };

export const handlerRegister = async (data, user) => {
    try {
        // Send a POST request to the /students/register endpoint
        const response = await fetch(backend_url + "/register/" + user, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        // Check if the request was successful
        if (response.ok) {
          console.log(user + " registered successfully");
          window.location.href = "/login";
        } else {
          console.error("Failed to register " + user);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    localStorage.removeItem('professor');
    window.location.href = '/';
}