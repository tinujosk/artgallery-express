// Init tabs
$(function () {
  const username = localStorage.getItem('loggedInUser');
  if (!username) {
    window.location.href = 'login.html';
  } else {
    $('.display-name').text(username);
    $('#tabs').tabs();
  }
});

$('.logout').click(() => {
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('loggedInUserId');
  window.location.href = 'login.html';
});
