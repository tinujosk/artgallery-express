let imagedata = [];

const displayImages = (data, callingFn) => {
  $('.grid').html('');
  if (data.length === 0) {
    $('.caption').text('');
    if (callingFn === 'loadlatest') {
      $('.not-found').find('p').text('Seems like nothing is here');
    } else {
      $('.not-found').find('p').text('Art Not Found');
    }
    $('.not-found').css('display', 'block');
    $('.gallery').css('display', 'none');
  } else {
    if (callingFn === 'loadlatest') {
      $('.caption').text('Here are the few latest arts...');
    } else {
      $('.caption').text('Search results...');
    }
    $('.not-found').css('display', 'none');
    $('.gallery').css('display', 'block');
    data.forEach(art => {
      $('.grid').append(`<div class="image-container">
    <img src="${art.imageURL}" alt="${art.title}"/>
    <div class="overlay">
      <h2>${art.title}</h2>
    </div>
    <p>
      ${art.description}
    </p>
  </div>`);
    });
  }
};

// Function to search for art
async function loadLatest() {
  const response = await fetch(`/art/latest`);
  imagedata = await response.json();

  displayImages(imagedata, 'loadlatest');
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
  $('.caption').text('Search Results...');
  displayImages(imagedata, 'searchart');
}

$(document).ready(function () {
  const username = localStorage.getItem('loggedInUser');
  if (!username) {
    window.location.href = 'login.html';
  } else {
    $('.display-name').text(username);
    loadLatest();
    $('.grid').on('click', '.image-container', function () {
      var heading = $(this).find('img').attr('alt');
      var imageLink = $(this).find('img').attr('src');
      var description = $(this).find('p').text();

      $('#image-heading').text(heading);
      $('#image-details').text(description);
      $('.side-panel').find('img').attr('src', imageLink);

      const artDetail = imagedata.find(art => art.imageURL === imageLink);
      let htmlContent = `
      <div class="artist-flex">
      <button>Buy Now</button>
        <ul>
          <li><b>Artist:</b> ${artDetail?.author}</li>
          <li><b>Medium:</b> ${artDetail?.medium}</li>
          <li><b>Year:</b> ${artDetail?.year}</li>
          <li><b>Price$:</b> ${artDetail?.price}</li>
          <li><b>Phone:</b> ${artDetail?.phone}</li>
        </ul>
      </div>
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
  }
});

$('.logout').click(() => {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'login.html';
});
