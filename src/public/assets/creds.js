const apiDomain = '';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signin-form').onsubmit = (e) => {
        e.preventDefault();
        fetch(apiDomain + '/login', {
            method: 'POST',
            body: {
                email: e.target.getElementById('email').value,
                password: e.target.getElementById('pword').value,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.ok) {
                    alert('Invalid credentials!');
                } else {
                    localStorage.setItem('jwt', res.token);
                    localStorage.setItem(
                        'username',
                        e.target.getElementById('uname')
                    );
                    e.target.getElementById('uname').value = '';
                    e.target.getElementById('pword').value = '';
                    e.target.getElementById('email').value = '';
                    alert('Signed in!');
                }
            });
    };

    document.getElementById('signup-form').onsubmit = (e) => {
        e.preventDefault();
        fetch(apiDomain + '/register', {
            method: 'POST',
            body: {
                email: e.target.getElementById('email').value,
                password: e.target.getElementById('pword').value,
                username: e.target.getElementById('uname').value,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.ok) {
                    alert('Username and/or email already taken');
                } else {
                    alert('Account created!');
                }
            });
    };
});
