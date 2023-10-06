import { usernames } from "./usernames";

function isUsernameAllowed(username) {
  return !usernames.includes(username);
}


export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "Invalid email address.";
}

export function validateUsername(username) {

    var pattern = /^[a-zA-Z0-9_]+$/;

    if (!pattern.test(username)){
        return "Username should not be Obscene"
    }

     if (!isUsernameAllowed(username.toLowerCase())) {
        return "Username should not be Obscene"
     }
    return username.length >= 3 ? null : "Username should contain at least 3 characters.";
}

export function validatePassword(password) {
    return password.length >= 6 ? null : "Password should contain at least 6 characters.";
}

export function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber) ? null : "Invalid phone number (10 digits required).";
}
