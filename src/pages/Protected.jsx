import { backend_url } from "../constants/constants";

import { useState, useEffect } from 'react';

function Protected() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(import.meta.env.VITE_REACT_BACKEND_URL + '/protected', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (!response.ok) {
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchData();
    }, []);

    if (isLoggedIn === null) {
        return <div>Loading...</div>;
    }

    return (
        isLoggedIn ? 
        <div>
            <h1>You can see this because you are logged in</h1>
        </div> :
        <h1>You cannot see the data because you are not logged in</h1>
    );
}

export default Protected;