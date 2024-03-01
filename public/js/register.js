// Validate login function
const register = event => {
  event.preventDefault();
  const username = $('#username').val();
  const email = $('#email').val();
  const password = $('#password').val();
  const confirmPassword = $('#confirmPassword').val();
  const role = $('input[name="role"]:checked').val();
  const errorMessageElement = $('.error-message');
  const form = $('#addUserForm');
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  errorMessageElement.text('');
  console.log('jj', username, email, password, confirmPassword, role);
  if (
    username === '' ||
    email === '' ||
    password === '' ||
    confirmPassword === '' ||
    role === ''
  ) {
    errorMessageElement.text('Please enter all fields.');
  } else if (!emailPattern.test(email)) {
    errorMessageElement.text('Please enter the email in correct format');
  } else if (password.length < 8) {
    errorMessageElement.text('Password must be atleast 8 characters');
  } else if (confirmPassword !== password) {
    errorMessageElement.text("Passwords doesn't match.");
  } else {
    if (role === 'admin') {
      const superkey = prompt(
        'Adding an admin requires the SuperKey, Please enter it here.'
      );
      //hardcoding it as of now.
      if (superkey === 'super') {
        addUser();
        window.location.assign('login.html');
      }
    } else {
      addUser();
      window.location.assign('login.html');
    }
  }
};

async function addUser() {
  const errorMessageElement = $('.error-message');
  const username = $('#username').val();
  const email = $('#email').val();
  const password = $('#password').val();
  const role = $('input[name="role"]:checked').val();
  const formData = { username, email, password, role };

  try {
    const result = await fetch('/user/add', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const message = await result.json();
    errorMessageElement.text(message?.message);
  } catch (error) {
    alert('Error adding user. Please try again.', error);
  }
}
