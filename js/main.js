// const $ul = document.querySelectorAll('ul');
// console.log($ul);
const $ulSearch = document.querySelector('#ul-search');
const $ulTopAnime = document.querySelector('#ul-top-anime');
const $ulTopUpcoming = document.querySelector('#ul-top-upcoming');
const $searchButton = document.querySelector('.search-button');
const $query = document.querySelector('#query');
const jikanSearch = 'https://api.jikan.moe/v4/anime?q=';
const jikanTopAnime = 'https://api.jikan.moe/v4/top/anime?filter=airing';
const jikanTopUpcoming = 'https://api.jikan.moe/v4/top/anime?filter=upcoming';
const $form = document.querySelector('.form');
const $topAnimesTab = document.querySelector('#top-animes');

$searchButton.addEventListener('click', searchFor);
$topAnimesTab.addEventListener('click', topAnimes);

function searchFor(event) {
  event.preventDefault();
  const url = jikanSearch + $query.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const anime = renderEntry(xhr.response.data[i]);
      $ulSearch.appendChild(anime);
    }
    toggleNoEntries();
  });
  xhr.send();
  viewSwap('search-results');
}

function topAnimes(event) {
  event.preventDefault();
  const url = jikanTopAnime;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const anime = renderEntry(xhr.response.data[i]);
      $ulTopAnime.appendChild(anime);
    }
    toggleNoEntries();
  });
  xhr.send();
  viewSwap('top-animes');
}

function topUpcoming(event) {
  const url = jikanTopUpcoming;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const anime = renderEntry(xhr.response.data[i]);
      $ulTopUpcoming.appendChild(anime);
    }
    toggleNoEntries();
  });
  xhr.send();
}

if (data.view === 'home') {
  topUpcoming();
}

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'column-third');

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.images.webp.image_url);
  $li.appendChild($img);

  const $p = document.createElement('p');
  $p.setAttribute('class', 'title');

  if (entry.title_english !== null) {
    $p.textContent = entry.title_english;
    $img.setAttribute('alt', entry.title_english);
  } else {
    $p.textContent = entry.title_japanese;
    $img.setAttribute('alt', entry.title_japanese);
  }
  $li.appendChild($p);

  return $li;
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

const $watchlistTab = document.querySelector('#watchlist');

// function clearSearch() {
//   while ($ul.length > 0) {
//     $ul.removeChild($ul.childNodes[0]);
//   }
// }

$headerTitle.addEventListener('click', function () {
  $form.reset();
  // clearSearch();
  viewSwap('home');
});

$watchlistTab.addEventListener('click', function () {
  viewSwap('watchlist');
});

const $noEntries = document.querySelector('.no-entries');

function toggleNoEntries() {
  if ($ulSearch.childNodes.length > 0) {
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
