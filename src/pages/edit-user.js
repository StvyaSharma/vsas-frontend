import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const apiUrl = 'http://localhost:8080/api';

function EditUser({ user }) {
    const router = useRouter();

    const [editedUser, setEditedUser] = useState(user);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${apiUrl}/users/${user.id}`, editedUser);
            router.push(`/user/${user.id}`);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={editedUser.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={editedUser.email}
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
        return { user };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { user: {} };
    }
};

export default EditUser;
