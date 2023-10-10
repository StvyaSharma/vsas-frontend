import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/navbar';
import { useRouter } from 'next/router';

function UserControlls() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is in localStorage
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      // User not found in localStorage, redirect to a login page or handle the case accordingly
      router.push('/login'); // Replace with your login page URL
      return;
    }

    const user = JSON.parse(userJson);

    // Check if the userRole is not "admin"
    if (user.userRole !== 'admin') {
      // User does not have admin role, redirect to forbidden page
      router.push('/forbidden'); // Replace with your forbidden page URL
      return;
    }

    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8080/api/users/all'); // Use Axios for GET request
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete the user?');
    
    if (confirmed) {
      try {
        await axios.get(`http://localhost:8080/api/users/delete/${userId}`); 

        window.location.reload();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  
  const toggleUserRole = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to toggle the user role?');
    
    if (confirmed) {
      try {
        await axios.get(`http://localhost:8080/api/users/toggleRole/${userId}`); 

        console.log("runned");
        window.location.reload();
      } catch (error) {
        console.error('Error toggling user role:', error);
      }
    }
  };
  
  const editUser = async (userId) => {
    // Implement your edit user logic here
    // You can navigate to an edit page or display a modal for editing
    router.push(`/edit-user/${userId}`); 
  };

  return (

    <>
      <Navbar />
      <main>
        <div style={{ padding: '20px' }}>
          <div className='main'>
            <div className="container mx-auto p-4">
              {users.map((user) => (
                <div key={user.id} className="border p-4 mb-4 rounded-lg">
                  <p className="font-bold">User ID: {user.id}</p>
                  <p>Username: {user.username}</p>
                  <p>Phone Number: {user.phoneNumber}</p>
                  <p>User Role: {user.userRole}</p>
                  <div className="mt-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mr-2"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                      onClick={() => toggleUserRole(user.id)}
                    >
                      Toggle Role
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => editUser(user.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserControlls;
