import { usernames } from "./usernames";
import axios from 'axios';
function isUsernameAllowed(username) {
  return !usernames.includes(username);
}


export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "Invalid email address.";
}

async function checkUsernameExists(username) {
    try {
      const response = await axios.post(`http://localhost:8080/api/users/check-username/${username}`);
  
      const data = await response;
      console.log(data)
      if(data.data == 'Username exists'){
        return true
      } else if (data.data == ""){
        return false
      }
    } catch (error) {
      console.error('Error checking username:', error.message);
      return false;
    }
  }
  

  export async function validateUsername(username) {
    var pattern = /^[a-zA-Z0-9_]+$/;
  
    if (!pattern.test(username)) {
      return "Username should not be Obscene";
    }
  
    try {
      const exists = await checkUsernameExists(username);
      if (exists) {
        return 'Username already exists';
      }
  
      if (!isUsernameAllowed(username.toLowerCase())) {
        return "Username should not be Obscene";
      }
  
      return username.length >= 3 ? null : "Username should contain at least 3 characters.";
    } catch (error) {
      console.error('Error checking username:', error.message);
      return "Error checking username";
    }
  }

export function validatePassword(password) {
    return password.length >= 6 ? null : "Password should contain at least 6 characters.";
}

export function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber) ? null : "Invalid phone number (10 digits required).";
}
