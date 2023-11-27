document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const message = document.getElementById('message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // You can use AJAX or fetch to send the data to the server
        // For this example, we will assume a successful registration
        // and display a message to the user.


        alert('User registered Successfully')
    });
});

