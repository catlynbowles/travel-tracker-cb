// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');


const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginFormSubmit");
const loginErrorMsg = document.getElementById("loginErrorMsg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    // if password === "travel" && if username === 'traveler' + valid id
    // => take them to the dashboard of their id. 
    // if (username === "user" && password === "web_dev") {
    //     alert("You have successfully logged in.");
    //     location.reload();
    // } else {
    //     loginErrorMsg.style.opacity = 1;
    // }
})
