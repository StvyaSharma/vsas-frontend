import axios from "axios";
const apiUrl = 'http://localhost:8080/api';

async function registerUser(credentials) {
    try {
        const response = await axios.post(`${apiUrl}/auth/register`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Network error:', error);

    }
}

export default registerUser;