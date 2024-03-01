const title = document.getElementById('title');
const author = document.getElementById('author');
const year = document.getElementById('year');
const medium = document.getElementById('medium');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const phone = document.getElementById('phone');
const description = document.getElementById('description');
const imageFile = document.getElementById('image');
const uploadButton = document.getElementById('upload');

uploadButton.setAttribute('disabled', 'enabled');

// Add event listeners to all input fields
title.addEventListener('input', checkFields);
author.addEventListener('input', checkFields);
year.addEventListener('input', checkFields);
medium.addEventListener('input', checkFields);
price.addEventListener('input', checkFields);
quantity.addEventListener('input', checkFields);
phone.addEventListener('input', checkFields);
description.addEventListener('input', checkFields);
imageFile.addEventListener('change', checkFields);

// Function to check if all fields are filled
function checkFields() {
  if (
    title.value.trim() !== '' &&
    author.value.trim() !== '' &&
    year.value.trim() !== '' &&
    medium.value.trim() !== '' &&
    price.value.trim() !== '' &&
    quantity.value.trim() !== '' &&
    phone.value.trim() !== '' &&
    description.value.trim() &&
    imageFile.files.length > 0
  ) {
    uploadButton.removeAttribute('disabled');
  } else {
    uploadButton.setAttribute('disabled', 'disabled');
  }
}

async function addArt() {
  const form = document.getElementById('addArtForm');
  const formData = new FormData(form);
  try {
    await fetch('/art/add', {
      method: 'POST',
      body: formData,
    });
    alert('Art added successfully! Please refresh the page');
    form.reset();
    loadAll();
  } catch (error) {
    alert('Error adding art. Please try again.');
  }
}

async function deleteArt(artId) {
  var result = window.confirm('Are you sure you want to delete this item?');
  if (result) {
    try {
      await fetch(`/art/delete/${artId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
      });
      alert('Art deleted successfully! Please refresh the page');
    } catch (error) {
      alert('Error deleting art. Please try again.');
    }
    loadAll();
  }
}

async function loadAll() {
  const response = await fetch(`/art/latest`);
  const data = await response.json();
  const table = document.getElementById('artTable');
  const tableBody = table.getElementsByTagName('tbody')[0];
  if (tableBody) {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    if (data.length === 0) {
      table.innerHTML =
        'No data available as of now. Please add data using the below form';
    } else {
      data.forEach(art => {
        const newRow = tableBody.insertRow(0);
        newRow.insertCell(0).innerHTML = art.title;
        newRow.insertCell(1).innerHTML = art.author;
        newRow.insertCell(2).innerHTML = art.year;
        newRow.insertCell(3).innerHTML = art.medium;
        newRow.insertCell(4).innerHTML = art.price;
        newRow.insertCell(5).innerHTML = art.quantity;
        newRow.insertCell(6).innerHTML = art.phone;
        newRow.insertCell(7).innerHTML = art.description;
        newRow.insertCell(8).innerHTML = art.imageURL;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML =
          '<i style="cursor: pointer;" class="fas fa-trash-alt"></i>';
        deleteButton.onclick = function () {
          deleteArt(art._id);
        };
        newRow.insertCell(9).appendChild(deleteButton);
      });
    }
  }
}

$(document).ready(function () {
  if (!localStorage.getItem('loggedInUser')) {
    window.location.href = 'login.html';
  } else {
    loadAll();
  }
});

$('.logout').click(() => {
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('loggedInUserId');
  window.location.href = 'login.html';
});
