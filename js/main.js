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
const $headerTitle = document.querySelector('#header-title');
const $watchlistTab = document.querySelector('#watchlist');

$searchButton.addEventListener('click', searchFor);

function searchFor(event) {
  event.preventDefault();
  const url = jikanSearch + $query.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  data.searchResults = [];
  xhr.addEventListener('load', () => {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const animeInfo = {
        animeId: xhr.response.data[i].mal_id,
        imgURL: xhr.response.data[i].images.webp.image_url,
        titleEng: xhr.response.data[i].title_english,
        titleJap: xhr.response.data[i].title_japanese,
        synopsis: xhr.response.data[i].synopsis,
        year: xhr.response.data[i].year,
        score: xhr.response.data[i].score,
        genres: xhr.response.data[i].genres[0].name
      };
      const anime = renderEntry(animeInfo);
      $ulSearch.appendChild(anime);
      data.searchResults.push(animeInfo);
    }
    toggleNoEntries();
  });
  xhr.send();
  clearSearch();
  viewSwap('search-results');
}

function topAnimes(event) {
  const url = jikanTopAnime;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  data.topAnimes = [];
  xhr.addEventListener('load', () => {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const animeInfo = {
        animeId: xhr.response.data[i].mal_id,
        imgURL: xhr.response.data[i].images.webp.image_url,
        titleEng: xhr.response.data[i].title_english,
        titleJap: xhr.response.data[i].title_japanese,
        synopsis: xhr.response.data[i].synopsis,
        year: xhr.response.data[i].year,
        score: xhr.response.data[i].score,
        genres: xhr.response.data[i].genres[0].name
      };
      const anime = renderEntry(animeInfo);
      $ulTopAnime.appendChild(anime);
      data.topAnimes.push(animeInfo);
    }
  });
  xhr.send();
}

function topUpcoming(event) {
  const url = jikanTopUpcoming;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  data.topUpcoming = [];
  xhr.addEventListener('load', () => {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const animeInfo = {
        animeId: xhr.response.data[i].mal_id,
        imgURL: xhr.response.data[i].images.webp.image_url,
        titleEng: xhr.response.data[i].title_english,
        titleJap: xhr.response.data[i].title_japanese,
        synopsis: xhr.response.data[i].synopsis,
        year: xhr.response.data[i].year,
        score: xhr.response.data[i].score,
        genres: xhr.response.data[i].genres[0].name
      };
      const anime = renderEntry(animeInfo);
      $ulTopUpcoming.appendChild(anime);
      data.topUpcoming.push(animeInfo);
    }
  });
  xhr.send();
}

$ulTopAnime.addEventListener('click', topAnimeDetails);

function topAnimeDetails(event) {
  // if (event.target) {

  // }
  viewSwap('details');
}

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'column-third');

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.imgURL);
  $li.appendChild($img);

  const $p = document.createElement('p');
  $p.setAttribute('class', 'title');

  if (entry.titleEng !== null) {
    $p.textContent = entry.titleEng;
    $img.setAttribute('alt', entry.titleEng);
  } else {
    $p.textContent = entry.titleJap;
    $img.setAttribute('alt', entry.titleJap);
  }
  $li.appendChild($p);

  return $li;
}

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

function handleDOMContentLoaded(event) {
  if (data.view === 'home') {
    topUpcoming();
    window.addEventListener('load', topAnimes);
  } else if (data.view === 'top-animes') {
    topAnimes();
    window.addEventListener('load', topUpcoming);
  } else if (data.view === 'search-results') {
    window.addEventListener('load', topAnimes);
    window.addEventListener('load', topUpcoming);
  }
  toggleNoEntries();
  viewSwap(data.view);
}

const $home = document.querySelector('.home');
const $searchResults = document.querySelector('.search-results');
const $details = document.querySelector('.details');
const $watchlist = document.querySelector('.watchlist');
const $topAnimes = document.querySelector('.top-animes');

function viewSwap(viewName) {
  if (viewName === 'search-results') {
    $home.className = 'home hidden';
    $searchResults.className = 'search-results';
    $watchlist.className = 'watchlist hidden';
    $details.className = 'details hidden';
    $topAnimes.className = 'top-animes hidden';
  } else if (viewName === 'home') {
    $searchResults.className = 'search-results hidden';
    $home.className = 'home';
    $watchlist.className = 'watchlist hidden';
    $details.className = 'details hidden';
    $topAnimes.className = 'top-animes hidden';
  } else if (viewName === 'details') {
    $details.className = 'details';
    $searchResults.className = 'search-results hidden';
    $home.className = 'home hidden';
    $watchlist.className = 'watchlist hidden';
    $topAnimes.className = 'top-animes hidden';
  } else if (viewName === 'watchlist') {
    $details.className = 'details hidden';
    $searchResults.className = 'search-results hidden';
    $home.className = 'home hidden';
    $watchlist.className = 'watchlist';
    $topAnimes.className = 'top-animes hidden';
  } else if (viewName === 'top-animes') {
    $details.className = 'details hidden';
    $searchResults.className = 'search-results hidden';
    $home.className = 'home hidden';
    $watchlist.className = 'watchlist hidden';
    $topAnimes.className = 'top-animes';
  }
  data.view = viewName;
}

$topAnimesTab.addEventListener('click', function () {
  viewSwap('top-animes');
});

$headerTitle.addEventListener('click', function () {
  $form.reset();
  viewSwap('home');
});

$watchlistTab.addEventListener('click', function () {
  viewSwap('watchlist');
});

function clearSearch() {
  while ($ulSearch.childNodes.length > 0) {
    $ulSearch.removeChild($ulSearch.childNodes[0]);
  }
}

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
