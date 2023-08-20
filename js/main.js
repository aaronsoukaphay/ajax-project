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
  clearSearch();
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
        trailerURL: xhr.response.data[i].trailer.embed_url,
        genres: []
      };
      for (let j = 0; j < xhr.response.data[i].genres.length; j++) {
        animeInfo.genres.push(xhr.response.data[i].genres[j].name);
      }
      const anime = renderEntry(animeInfo);
      $ulSearch.appendChild(anime);
      data.searchResults.push(animeInfo);
    }
    toggleNoEntries();
  });
  xhr.send();
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
        trailerURL: xhr.response.data[i].trailer.embed_url,
        genres: []
      };
      for (let j = 0; j < xhr.response.data[i].genres.length; j++) {
        animeInfo.genres.push(xhr.response.data[i].genres[j].name);
      }
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
        imgURL: xhr.response.data[i].images.webp.large_image_url,
        titleEng: xhr.response.data[i].title_english,
        titleJap: xhr.response.data[i].title_japanese,
        synopsis: xhr.response.data[i].synopsis,
        year: xhr.response.data[i].year,
        score: xhr.response.data[i].score,
        trailerURL: xhr.response.data[i].trailer.embed_url,
        genres: []
      };
      for (let j = 0; j < xhr.response.data[i].genres.length; j++) {
        animeInfo.genres.push(xhr.response.data[i].genres[j].name);
      }
      const anime = renderEntry(animeInfo);
      $ulTopUpcoming.appendChild(anime);
      data.topUpcoming.push(animeInfo);
    }
  });
  xhr.send();
}

$ulTopAnime.addEventListener('click', topAnimeDetails);
const $detailsView = document.querySelector('.details');

function topAnimeDetails(event) {
  clearDetails();
  for (let i = 0; i < data.topAnimes.length; i++) {
    if (Number(event.target.getAttribute('clicked-anime-id')) === data.topAnimes[i].animeId) {
      const renderedDetails = renderDetails(data.topAnimes[i]);
      $detailsView.appendChild(renderedDetails);
      data.details = [];
      data.details.push(data.topAnimes[i]);
      watchlistEntry();
    }
  }
  viewSwap('details');
}

$ulTopUpcoming.addEventListener('click', topUpcomingDetails);

function topUpcomingDetails(event) {
  clearDetails();
  for (let i = 0; i < data.topUpcoming.length; i++) {
    if (Number(event.target.getAttribute('clicked-anime-id')) === data.topUpcoming[i].animeId) {
      const renderedDetails = renderDetails(data.topUpcoming[i]);
      $detailsView.appendChild(renderedDetails);
      data.details = [];
      data.details.push(data.topUpcoming[i]);
      watchlistEntry();
    }
  }
  viewSwap('details');
}

$ulSearch.addEventListener('click', searchDetails);

function searchDetails(event) {
  clearDetails();
  for (let i = 0; i < data.searchResults.length; i++) {
    if (Number(event.target.getAttribute('clicked-anime-id')) === data.searchResults[i].animeId) {
      const renderedDetails = renderDetails(data.searchResults[i]);
      $detailsView.appendChild(renderedDetails);
      data.details = [];
      data.details.push(data.searchResults[i]);
      watchlistEntry();
    }
  }
  viewSwap('details');
}

function clearDetails() {
  if ($detailsView.childNodes.length > 3) {
    $detailsView.removeChild($detailsView.childNodes[3]);
  }
}

function loadDetails() {
  const renderedDetails = renderDetails(data.details[0]);
  $detailsView.appendChild(renderedDetails);
}

const $ulWatchlist = document.querySelector('#ul-watchlist');

function watchlistEntry() {
  const $addToWatchListBtn = document.querySelector('#add-watchlist-button');
  $addToWatchListBtn.addEventListener('click', renderWatchlist);
}

function renderWatchlist() {
  data.watchlist.push(data.details[0]);
  const renderedWatchlist = renderEntry(data.details[0]);
  $ulWatchlist.appendChild(renderedWatchlist);
  toggleNoWatchlistEntries();
  viewSwap('watchlist');
}

function loadWatchlist() {
  for (let i = 0; i < data.watchlist.length; i++) {
    const renderedWatchlist = renderEntry(data.watchlist[i]);
    $ulWatchlist.appendChild(renderedWatchlist);
  }
}

const $noEntriesWatchlist = document.querySelector('.no-entries-watchlist');

function toggleNoWatchlistEntries() {
  if ($ulWatchlist.childNodes.length > 0) {
    $noEntriesWatchlist.className = 'no-entries-watchlist hidden';
  } else {
    $noEntriesWatchlist.className = 'no-entries-watchlist';
  }
}

function renderDetails(detail) {
  const $div = document.createElement('div');
  $div.setAttribute('id', 'details');

  const $detailsDiv = document.createElement('div');
  $detailsDiv.setAttribute('class', 'row');
  $div.appendChild($detailsDiv);

  const $divPosterContainer = document.createElement('div');
  $divPosterContainer.setAttribute('class', 'column-half poster-container');
  $detailsDiv.appendChild($divPosterContainer);

  const $img = document.createElement('img');
  $img.setAttribute('src', detail.imgURL);
  $img.setAttribute('alt', detail.titleEng);
  $divPosterContainer.appendChild($img);

  const $divDescriptionBox = document.createElement('div');
  $divDescriptionBox.setAttribute('class', 'column-half description-box');
  $detailsDiv.appendChild($divDescriptionBox);

  const $divDescriptionTitleBox = document.createElement('div');
  $divDescriptionTitleBox.setAttribute('class', 'description-title-box');
  $divDescriptionBox.appendChild($divDescriptionTitleBox);

  const $h4 = document.createElement('h4');
  $h4.setAttribute('class', 'description-title');
  $h4.textContent = detail.titleEng;
  $divDescriptionTitleBox.appendChild($h4);

  const $divDescriptionBody = document.createElement('div');
  $divDescriptionBody.setAttribute('class', 'description-body');
  $divDescriptionBox.appendChild($divDescriptionBody);

  const $pSynopsis = document.createElement('p');
  $pSynopsis.textContent = detail.synopsis;
  $divDescriptionBody.appendChild($pSynopsis);

  const $pYear = document.createElement('p');
  $pYear.textContent = `Release Year: ${detail.year}`;
  $divDescriptionBody.appendChild($pYear);

  const $pScore = document.createElement('p');
  $pScore.textContent = `Score: ${detail.score}/10`;
  $divDescriptionBody.appendChild($pScore);

  const $pGenre = document.createElement('p');
  $pGenre.textContent = `Genre: ${detail.genres}`;
  $divDescriptionBody.appendChild($pGenre);

  const $divWatchlistContainer = document.createElement('div');
  $divWatchlistContainer.setAttribute('class', 'add-watchlist-container');
  $divDescriptionBox.appendChild($divWatchlistContainer);

  const $a = document.createElement('a');
  $a.setAttribute('id', 'add-watchlist-button');
  $a.setAttribute('href', '#');
  $a.textContent = 'Add to watchlist';
  $divWatchlistContainer.appendChild($a);

  if (detail.titleEng === null) {
    $h4.textContent = detail.titleJap;
    $img.setAttribute('alt', detail.titleJap);
  }

  if (detail.year === null) {
    $pYear.textContent = 'Year Released: year not available';
  }

  if (detail.score === null) {
    $pScore.textContent = 'Score: score not available';
  }

  // trailer section

  const $trailerDiv = document.createElement('div');
  $trailerDiv.setAttribute('class', 'row');
  $div.appendChild($trailerDiv);

  const $divFull = document.createElement('div');
  $divFull.setAttribute('class', 'column-full');
  $trailerDiv.appendChild($divFull);

  const $h4Trailer = document.createElement('h4');
  $h4Trailer.setAttribute('class', 'trailer-title');
  $h4Trailer.textContent = 'WATCH TRAILER';
  $divFull.appendChild($h4Trailer);

  const $divTrailer = document.createElement('div');
  $divTrailer.setAttribute('class', 'column-full trailer-video');
  $trailerDiv.appendChild($divTrailer);

  if (detail.trailerURL === null) {
    const $p = document.createElement('p');
    $p.setAttribute('class', 'trailer-title');
    $p.textContent = 'Trailer not available.';
    $divFull.appendChild($p);
  } else {
    const $iframe = document.createElement('iframe');
    $iframe.setAttribute('width', '800');
    $iframe.setAttribute('height', '450');
    $iframe.setAttribute('src', detail.trailerURL);
    $divTrailer.appendChild($iframe);
  }

  return $div;
}

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'column-third');

  const $a = document.createElement('a');
  $a.setAttribute('href', '#');
  $li.appendChild($a);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.imgURL);
  $img.setAttribute('clicked-anime-id', entry.animeId);
  $img.setAttribute('alt', entry.titleEng);
  $a.appendChild($img);

  const $p = document.createElement('p');
  $p.setAttribute('class', 'title');
  $p.setAttribute('clicked-anime-id', entry.animeId);
  $p.textContent = entry.titleEng;
  $a.appendChild($p);

  if (entry.titleEng === null) {
    $p.textContent = entry.titleJap;
    $img.setAttribute('alt', entry.titleJap);
  }

  return $li;
}

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

function handleDOMContentLoaded(event) {
  if (data.view === 'home') {
    topUpcoming();
    topAnimes();
    loadWatchlist();
  } else if (data.view === 'top-animes') {
    topAnimes();
    topUpcoming();
    loadWatchlist();
  } else if (data.view === 'search-results') {
    topAnimes();
    topUpcoming();
    loadWatchlist();
  } else if (data.view === 'details') {
    topAnimes();
    topUpcoming();
    loadDetails();
    loadWatchlist();
  } else if (data.view === 'watchlist') {
    topAnimes();
    topUpcoming();
    loadWatchlist();
  }
  toggleNoEntries();
  toggleNoWatchlistEntries();
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
