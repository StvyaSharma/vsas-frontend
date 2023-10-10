import axios from "axios";
const apiUrl = 'http://localhost:8080/api/users/user';


export function getUser(username) {
  return axios.get(`${apiUrl}/${username}`)
    .then((response) => {
      // Handle the successful response here
      const user = response.data;
      console.log(user)
      return user;
    })
    .catch((error) => {
      // Handle any errors here
      console.error('Error:', error);
      throw error; // You can choose to handle or propagate the error as needed
    });
}
