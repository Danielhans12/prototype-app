export function setupSectionToggle() {
    const welcomeSection = document.getElementById('welcomepage');
    const authSection = document.getElementById('maincontent');
    const startButton = document.getElementById('googleSignInButton');
    const logoutButton = document.getElementById('logoutButton');

    startButton.addEventListener('click', () => {
        welcomeSection.style.display = 'none';
        authSection.style.display = 'flex';

        console.log("this works 3");
    });

    logoutButton.addEventListener('click', () => {
        welcomeSection.style.display = 'grid';
        authSection.style.display = 'none';

        console.log("this works 3");

    });
    
}
