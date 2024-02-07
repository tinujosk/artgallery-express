const title = document.getElementById('title');
const author = document.getElementById('author');
const year = document.getElementById('year');
const medium = document.getElementById('medium');
const price = document.getElementById('price');
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
    const response = await fetch('/art/add', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    alert('Art added successfully!', data);
    form.reset();
    loadAll();
  } catch (error) {
    alert('Error adding art. Please try again.');
  }
}

async function loadAll() {
  const response = await fetch(`/art/all`);
  const data = await response.json();
  const table = document.getElementById('artTable');
  const tableBody = table.getElementsByTagName('tbody')[0];

  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
  if (data.length === 0) {
    table.innerHTML =
      'No data available as of now. Please add data using the below form';
  } else {
    data.forEach(art => {
      var newRow = tableBody.insertRow(0);
      newRow.insertCell(0).innerHTML = art.title;
      newRow.insertCell(1).innerHTML = art.author;
      newRow.insertCell(2).innerHTML = art.year;
      newRow.insertCell(3).innerHTML = art.medium;
      newRow.insertCell(4).innerHTML = art.price;
      newRow.insertCell(5).innerHTML = art.phone;
      newRow.insertCell(6).innerHTML = art.description;
      newRow.insertCell(7).innerHTML = art.imageURL;
    });
  }
}
