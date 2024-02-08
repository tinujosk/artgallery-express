// User login details
const users = [
  { email: 'admin@artgallery.com', username: 'admin', password: 'admin123' },
];

// Validate login function
const validateLogin = event => {
  event.preventDefault();
  const email = $('#username').val();
  const password = $('#password').val();
  const errorMessageElement = $('#errorMessage');

  // Clear previous error message
  errorMessageElement.text('');

  const user = users.find(
    user => user.username === email || user.email === email
  );

  // If password is authenticated, stores the user details in the localStorage.
  if (user && user.password === password) {
    localStorage.setItem('loggedInUser', email);
    window.location.assign('admin.html');
  } else {
    errorMessageElement.text('Invalid username or password. Please try again.');
  }
};
