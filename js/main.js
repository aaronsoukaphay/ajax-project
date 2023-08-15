const $ul = document.querySelector('ul');
const $searchButton = document.querySelector('.search-button');
const $query = document.querySelector('#query');
const jikan = 'https://api.jikan.moe/v4/anime?q=';
const $form = document.querySelector('.form');

$searchButton.addEventListener('click', searchFor);

function searchFor(event) {
  event.preventDefault();
  const url = jikan + $query.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    // console.log(xhr.response);
    for (let i = 0; i < xhr.response.data.length; i++) {
      const $li = document.createElement('li');
      $li.setAttribute('class', 'column-third');

      const $img = document.createElement('img');
      $img.setAttribute('src', xhr.response.data[i].images.webp.image_url);
      $li.appendChild($img);

      const $p = document.createElement('p');
      $p.setAttribute('class', 'title');
      if (xhr.response.data[i].title_english !== null) {
        $p.textContent = xhr.response.data[i].title_english;
      } else {
        $p.textContent = xhr.response.data[i].title_japanese;
      }
      $li.appendChild($p);

      $ul.appendChild($li);
    }
    toggleNoEntries();
  });
  xhr.send();
  viewSwap('search-results');
}

const $home = document.querySelector('.home');
const $searchResults = document.querySelector('.search-results');
const $headerTitle = document.querySelector('#header-title');
const $details = document.querySelector('.details');
const $watchlist = document.querySelector('.watchlist');
const $topAnimes = document.querySelector('.top-animes');

function viewSwap(viewName) {
  if (viewName === 'search-results') {
    $home.className = 'home hidden';
    $searchResults.className = 'search-results';
    $headerTitle.className = 'header-tab';
    $watchlist.className = 'watchlist hidden';
    $details.className = 'details hidden';
    $topAnimes.className = 'top-animes hidden';
  } else if (viewName === 'home') {
    $searchResults.className = 'search-results hidden';
    $home.className = 'home';
    $headerTitle.className = 'header-tab hidden';
    $watchlist.className = 'watchlist hidden';
    $details.className = 'details hidden';
    $topAnimes.className = 'top-animes hidden';
  } else if (viewName === 'details') {
    $details.className = 'details';
    $searchResults.className = 'search-results hidden';
    $home.className = 'home hidden';
    $headerTitle.className = 'header-tab';
    $watchlist.className = 'watchlist hidden';
    $topAnimes.className = 'top-animes hidden';
  } else if (viewName === 'watchlist') {
    $details.className = 'details hidden';
    $searchResults.className = 'search-results hidden';
    $home.className = 'home hidden';
    $headerTitle.className = 'header-tab';
    $watchlist.className = 'watchlist';
    $topAnimes.className = 'top-animes hidden';
  } else if (viewName === 'top-animes') {
    $details.className = 'details hidden';
    $searchResults.className = 'search-results hidden';
    $home.className = 'home hidden';
    $headerTitle.className = 'header-tab';
    $watchlist.className = 'watchlist hidden';
    $topAnimes.className = 'top-animes';
  }
  data.view = viewName;
}

const $topAnimesTab = document.querySelector('#top-animes');
const $watchlistTab = document.querySelector('#watchlist');

function clearSearch() {
  while ($ul.childNodes.length > 0) {
    $ul.removeChild($ul.childNodes[0]);
  }
}

$headerTitle.addEventListener('click', function () {
  $form.reset();
  clearSearch();
  viewSwap('home');
});

$topAnimesTab.addEventListener('click', function () {
  viewSwap('top-animes');
});

$watchlistTab.addEventListener('click', function () {
  viewSwap('watchlist');
});

const $noEntries = document.querySelector('.no-entries');

function toggleNoEntries() {
  if ($ul.childNodes.length > 0) {
    $noEntries.className = 'no-entries hidden';
  } else {
    $noEntries.className = 'no-entries';
  }
}

let counter = 0;
const $imgList = document.querySelectorAll('.carousel');

const bannerID = setInterval(nextImg, 3500);

function nextImg() {
  if (counter < 5) {
    for (let i = 0; i < $imgList.length; i++) {
      if (i === counter) {
        $imgList[i].className = 'carousel';
      } else {
        $imgList[i].className = 'carousel hidden';
      }
    }
    counter++;
  } else {
    counter = 0;
    clearInterval(bannerID);
  }
}
