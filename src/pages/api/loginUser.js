import axios from "axios";
const apiUrl = 'http://localhost:8080/api';
async function loginUser(credentials) {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response)
        if (response.data == 'login successful') {
            return 'login successful'
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Network error:', error);

    }
}

export default loginUser;