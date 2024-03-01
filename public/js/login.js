// Validate login function
const validateLogin = async event => {
  event.preventDefault();
  const username = $('#username').val();
  const password = $('#password').val();
  const errorMessageElement = $('.error-message');
  const formData = { username, password };

  // Clear previous error message
  errorMessageElement.text('');

  if (username === '' || password === '') {
    errorMessageElement.text('Please enter username and password.');
  } else {
    const result = await fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const user = await result.json();
    console.log('checl usr', user);

    // If password is authenticated, stores the user details in the localStorage.
    if (user?.username) {
      if (user.role === 'admin') {
        window.location.assign('admin.html');
      } else {
        window.location.assign('index.html');
      }
      localStorage.setItem('loggedInUser', user?.username);
      localStorage.setItem('loggedInUserId', user?._id);
    } else {
      errorMessageElement.text(
        'Invalid username or password. Please try again.'
      );
    }
  }
};
