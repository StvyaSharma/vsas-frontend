import axios from "axios";

export function fetchScrollData() {
    // Define the URL
    const apiUrl = 'http://localhost:8080/api/scrolls/all';
  
    // Make the GET request
    return axios.get(apiUrl)
      .then(response => {
        // Return the response data
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }