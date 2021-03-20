document.addEventListener('DOMContentLoaded', (e) => {
    if (Object.keys(localStorage).includes('username')) {
        document.getElementById('as').innerText = localStorage.getItem(
            'username'
        );
    }
});
