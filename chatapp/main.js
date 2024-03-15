import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import welcome from '/welcome.svg';
import { setupSectionToggle } from './toggleSections.js';
import cog from '/cog.svg';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { collection, query, orderBy, limit, addDoc, serverTimestamp, onSnapshot, deleteDoc, getDocs } from "firebase/firestore";

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
const auth = getAuth();
const firestore = getFirestore();

  // Real-time listener for chat messages
  const messagesRef = collection(firestore, 'messages');




document.querySelector('#app').innerHTML = `
<section id="maincontent" class="authsuccess">
  <aside>
    <button  class="sidebar-button sideba">
      <img src="${cog}"/>
    </button>
    <button id="logoutButton">Logout</button>


  </aside>
  <main id="chatContainer">
    <div class="Chatsection">
        <header>
            <button id="toside" class="sidebar-button sideba">
                <img src="${cog}"/>
            </button>
            <h2>Messages</h2>
        </header>

        <div class="listofconvosparent">
            <div class="listofconvossub">
                <span id="messagesContainer" class="listofconvos"></span>
            </div>
        </div>
    </div>
  </main>
</section>

<section id="welcomepage" class="welcome">
  <h1>Chat App</h1>
  <button id="googleSignInButton" class="startbutt">Sign in with Google</button>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
</section>
`;



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
//Add event listener for Google sign-in button
const googleSignInButton = document.getElementById('googleSignInButton');

googleSignInButton.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            console.log('Google sign-in successful:', user);

            // Display the maincontent section
            document.getElementById('maincontent').style.display = 'block';

            // Hide the welcomepage section
            document.getElementById('welcomepage').style.display = 'none';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error('Google sign-in error:', errorMessage);
        });
});


// Function to render chat messages
function renderChatMessage(message) {
    const { text, uid, photoURL } = message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', messageClass);
    messageDiv.innerHTML = `
      <img src="${photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}" />
      <p>${text}</p>
    `;
  
    return messageDiv;
  }
  // Function to render chat room
function renderChatRoom(messages) {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = '';
  
    messages.forEach(message => {
      const messageElement = renderChatMessage(message);
      messagesContainer.appendChild(messageElement);
    });
  
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  const allMessagesQuery = query(messagesRef);
  async function deleteOldestMessageIfExceedsLimit() {
    try {
        const messageSnapshot = await getDocs(allMessagesQuery);
        const messageCount = messageSnapshot.size;

        if (messageCount >= 30 ) {
            const oldestMessage = messageSnapshot.docs[0];
            await deleteDoc(oldestMessage.ref);

            console.log('Oldest message deleted successfully');
        } else {
            console.log('No messages to delete');
        }
    } catch (error) {
        console.error('Error deleting oldest message:', error);
    }
}

// Add event listener for delete oldest message button





const q = query(messagesRef, orderBy('createdAt'), limit(30));
onSnapshot(q, (querySnapshot) => {
  const messages = [];
  querySnapshot.forEach((doc) => {
    messages.push({ id: doc.id, ...doc.data() });
  });
  renderChatRoom(messages);
});



  // Function to send message
  async function sendMessage(formValue) {
    const { uid, photoURL } = auth.currentUser;
  
    try {

    await deleteOldestMessageIfExceedsLimit(); // Check and delete the oldest message if necessary
      await addDoc(collection(firestore, 'messages'), {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
// Event listener for sending messages
const form = document.createElement('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = form.querySelector('input[type="text"]');
  const formValue = input.value.trim();
  if (formValue !== '') {
    sendMessage(formValue);
    input.value = '';
  }
});
form.innerHTML = `
  <input type="text" placeholder="Please Enter Something" />
  <button type="submit">🐤</button>
`;
document.getElementById('chatContainer').appendChild(form);

// Add event listener for logout button
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('User signed out');
        setupSectionToggle();
    }).catch((error) => {
        // An error happened.
        console.error('Logout error:', error.message);
    });
});
document.getElementById('googleSignInButton').addEventListener('click', googleSignInButton);