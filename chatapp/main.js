import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import welcome from '/welcome.svg';
import { setupSectionToggle } from './toggleSections.js';
import cog from '/cog.svg';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Import createUserWithEmailAndPassword
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKCZ3b7Ic84EeM7_m1Qdw3Uom2EGLXfNA",
  authDomain: "chat-app-38a26.firebaseapp.com",
  databaseURL: "https://chat-app-38a26-default-rtdb.firebaseio.com",
  projectId: "chat-app-38a26",
  storageBucket: "chat-app-38a26.appspot.com",
  messagingSenderId: "805453317899",
  appId: "1:805453317899:web:259bf345b68fbecaed040e",
  measurementId: "G-JWL8FTYDB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(); // Get the Auth object













document.querySelector('#app').innerHTML = `


<section id="maincontent" class="authsuccess">

  <aside>
  <button  class="sidebar-button sideba">
    <img src="${cog}"/>
  </button>

  <input type="file"/>
  <input type="text" placeholder="Name"/>
  <button id="createupdateprofile">Create/Update</button>
  <button id="logoutButton">Logout</button>
  </aside>
  <main>
      <div class="Chatsection">
        <header>
          <button id="toside" class="sidebar-button sideba">
            <img src="${cog}"/>
          </button>
          <h2>Messages</h2>
        </header>
        <div class="searchuser" id="searchfuncuser">
            <input type="text" id="searchvalueuser" placeholder="Search" class="searchuwu">
        </div>
        <div class="listofconvos" id="conversationdisplay">

        </div>
      </div>

  </main>
 </section>
<section id="authentication" class="authsect">
    <h1>Login</h1>
    <div id="authForm">
        <input type="email" id="emailInput" placeholder="Email">
        <input type="password" id="passwordInput" placeholder="Password">
        <button id="authlog">Login</button>
        <h3 id="loginButton">Not Yet Registered?</h3>

    </div>
</section>

<section id="signupSection" class="signup">
    <h1>Sign Up</h1>
    <div id="authForm">
        <input type="email" id="emailInputsignup" placeholder="Email">
        <input type="password" id="passwordInputsignup" placeholder="Password">
        <button id="authreg">Sign Up</button> <!-- Changed the button text to "Sign Up" -->
        <h3 id="signups">Already have an account?</h3> <!-- Fixed typo -->
    </div>
</section>
<section id="welcomepage" class="welcome">
    <h1>Chat App</h1>
    <button id="startButton" class="startbutt">Start Now</button>
    <div class="wave"></div>
</section>
`;
setupSectionToggle();


// Add event listener for sign-up button
// Add event listener for sign-up button
const signUpButton = document.getElementById('authreg');
signUpButton.addEventListener('click', () => {
    const email = document.getElementById('emailInputsignup').value; // Get email input value
    const password = document.getElementById('passwordInputsignup').value; // Get password input value

    // Check if the user is already logged in
    if (auth.currentUser) {
        // User is already signed in, show alert or message
        alert('You are already signed up.');
        return; // Exit the function
    }

    createUserWithEmailAndPassword(auth, email, password) // Create user with email and password
        .then((userCredential) => {
            // User signed up successfully
            const user = userCredential.user;
            console.log('User signed up:', user);
            // Hide authentication sections and show auth success section
            document.getElementById('authentication').style.display = 'none';
            document.getElementById('signupSection').style.display = 'none';
            document.querySelector('.authsuccess').style.display = 'block';
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Sign-up error:', errorMessage);
            // Add code to display error message to user
        });
});

// Select the login button
const loginButton = document.getElementById('authlog');

// Add an event listener to the login button
loginButton.addEventListener('click', () => {
    // Get the email and password input values
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    // Sign in the user with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            console.log('User signed in:', user);
            alert('you successfully log in!');
            // Hide authentication sections and show auth success section
            document.getElementById('authentication').style.display = 'none';
            document.getElementById('signupSection').style.display = 'none';
            document.querySelector('.authsuccess').style.display = 'block';
            // Add code to navigate to chat page or perform other actions upon successful login
        })
        .catch((error) => {
            // Handle login errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Login error:', errorMessage);
            alert('wrong password hahaha');
            // Add code to display error message to the user
        });
});

document.addEventListener('DOMContentLoaded', () => {
  const sideButtons = document.querySelectorAll('.sidebar-button');
  const aside = document.querySelector('.authsuccess aside');

  // Add click event listener to each side button
  sideButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Toggle the width of the aside element
          if (aside.style.width === '25rem') {
              aside.style.width = '0rem';
              aside.style.transform = 'translateX(-25rem)';
          } else {
              aside.style.width = '25rem';
              aside.style.transform = 'translateX(0rem)';
          }
      });
  });
});

// Add event listener for logout button
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        // Sign-out successful.
        alert('User signed out');
        // Show authentication sections and hide auth success section
        document.getElementById('authentication').style.display = 'grid';
        document.getElementById('signupSection').style.display = 'grid';
        document.querySelector('.authsuccess').style.display = 'none';
    }).catch((error) => {
        // An error happened.
        console.error('Logout error:', error.message);
    });
});
