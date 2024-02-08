let imagedata = [];

const displayImages = data => {
  console.log('image', imagedata);
  const imageGrid = document.getElementById('grid');
  imageGrid.innerHTML = '';
  if (data.length === 0) {
    imageGrid.innerHTML += '<p>No results found.</p>';
  } else {
    data.forEach(art => {
      imageGrid.innerHTML += `<div class="image-container">
    <img src="${art.imageURL}" alt="${art.title}"/>
    <div class="overlay">
      <h2>${art.title}</h2>
    </div>
    <p>
      ${art.description}
    </p>
  </div>`;
    });
  }
};

// Function to search for art
async function loadAll() {
  const response = await fetch(`/art/all`);
  imagedata = await response.json();

  displayImages(imagedata);
}

// Function to search for art
async function searchArt() {
  var loader = document.getElementById('loader');
  loader.style.display = 'block';
  const keyword = document.getElementById('keyword').value;
  const response = await fetch(`/art/search?keyword=${keyword}`);
  imagedata = await response.json();
  loader.style.display = 'none';
  $('.close-icon').click();
  displayImages(imagedata);
}

$(document).ready(function () {
  loadAll();
  $('#grid').on('click', '.image-container', function () {
    var heading = $(this).find('img').attr('alt');
    var imageLink = $(this).find('img').attr('src');
    var description = $(this).find('p').text();

    $('#image-heading').text(heading);
    $('#image-details').text(description);
    $('.side-panel').find('img').attr('src', imageLink);

    const artDetail = imagedata.find(art => art.imageURL === imageLink);
    let htmlContent = `
      <ul>
        <li><b>Artist:</b> ${artDetail?.author}</li>
        <li><b>Medium:</b> ${artDetail?.medium}</li>
        <li><b>Year:</b> ${artDetail?.year}</li>
        <li><b>Price:</b> ${artDetail?.price}</li>
        <li><b>Phone:</b> ${artDetail?.phone}</li>
      </ul>
    `;

    $('.side-panel').find('#artist').html(htmlContent);
    $('.side-panel').addClass('open');
    $('.gallery').css('justify-content', 'flex-start');
    $('.grid').css('animation', 'widthChange 0.5s forwards');
    $('.image-container p').css('display', 'none');
  });

  $('.close-icon').click(function (e) {
    if (e.target !== this) return;
    $('.side-panel').removeClass('open');
    $('.grid').css('animation', 'widthChangeBack 2s forwards');
    $('.image-container p').css('display', 'block');
  });
});
