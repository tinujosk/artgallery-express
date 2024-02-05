/*
Done by Smitkumar Sanjaykumar Macwan
email: smacwan9653@conestogac.on.ca
*/

// Init tabs
$(function () {
  $("#tabs").tabs();
});

// Fetches the user details from the local storage and displays in the header
var loggedInUser = localStorage.getItem("loggedInUser");
var usernameElement = document.getElementById("username");
usernameElement.textContent = loggedInUser;
