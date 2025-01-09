const form = document.getElementById('profileForm');
const errorMessages = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    errorMessages.textContent = '';
    successMessage.textContent = '';

    const name = document.getElementById('username').value.trim();
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const location = document.getElementById('location').value.trim();
    const interests = document.getElementById('interests').value.trim();
    const profilePicture = document.getElementById('profilePicture').files[0];

    if (!name || !age || !gender || !location || !interests || !profilePicture) {
        errorMessages.textContent = 'Please fill out all mandatory fields.';
        return;
    }

    if (profilePicture && !profilePicture.type.startsWith('image/')) {
        errorMessages.textContent = 'Invalid file format!';
        return;
    }

    successMessage.textContent = 'Profile created successfully!';
    form.reset();
});
