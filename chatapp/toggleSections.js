export function setupSectionToggle() {
    const welcomeSection = document.getElementById('welcomepage');
    const authSection = document.getElementById('authentication');
    const signupSection = document.getElementById('signupSection');
    const startButton = document.querySelector('#startButton');
    const loginButton = document.querySelector('#loginButton');
    const signupButton = document.querySelector('#signups');

    startButton.addEventListener('click', () => {
        welcomeSection.style.display = 'none';
        authSection.style.display = 'grid';
        signupSection.style.display = 'none';
        console.log("this works 3");

    });

    loginButton.addEventListener('click', () => {



        welcomeSection.style.display = 'none';
        authSection.style.display = 'none';
        console.log("this works");
        signupSection.style.display = 'grid';

    });

    signupButton.addEventListener('click', () => {
        welcomeSection.style.display = 'none';
        authSection.style.display = 'grid';
        signupSection.style.display = 'none';
        console.log("this works 2");
    });
    
}
