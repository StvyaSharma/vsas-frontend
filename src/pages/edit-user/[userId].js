import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const apiUrl = 'http://localhost:8080/api';

function EditUser({ userId }) {
    const router = useRouter();

    const [user, setUser] = useState({
        username: '',
        email: '',
        // Add other user properties here (except password)
    });

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(`${apiUrl}/users/${userId}`); // Replace with your API endpoint to fetch user data
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${apiUrl}/users/${userId}`, user); // Replace with your API endpoint to update user data
            router.push(`/user/${userId}`);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <h1>Edit User (ID: {userId})</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Add other input fields for user properties */}
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

EditUser.getInitialProps = async ({ query }) => {
    const { userId } = query;

    try {
        const response = await axios.get(`${apiUrl}/users/${userId}`);
        const user = response.data;
        return { userId, user };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { userId, user: {} };
    }
};

export default EditUser;
