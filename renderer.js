(function () {
    'use strict';

    var db = new PouchDB('credentials');
    var doc = {
        _id: "user@aemenersol.com",
        username: "user@aemenersol.com",
        password: "123"
    };

    db.put(doc);
})();

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Call the login API
    fetch('http://test-demo.aemenersol.com/api/account/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (typeof data == "string") {
                displayError('Login successful using login API credentials!');
                // alert('Login successful using login API credentials!');
            } else {
                checkPouchDB(username, password);
            }
        })
        .catch(error => {
            console.error('Login API Error:', error)
        });
}

async function checkPouchDB(username, password) {
    var db = new PouchDB('credentials');

    db.get(username)
        .then(response => {
            if (response.password === password) {
                displayError('Login successful using pouchdb credentials!');
                // alert('Login successful using pouchDB credentials!');
            } else {
                displayError('Invalid credentials');
            }
        })
        .catch(error => {
            displayError('Invalid credentials');
        });
}

function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
}
