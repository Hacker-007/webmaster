document.addEventListener('DOMContentLoaded', () => {
    if (Object.keys(localStorage).includes('jwt')) {
        let button = document.getElementById('login-button');
        button.innerText = 'Sign out';
        button.onclick = (e) => {
            localStorage.removeItem('jwt');
            alert('Logged out!');
        };
    }
});
