const $ul = document.querySelector('ul');

const $searchButton = document.querySelector('.search-button');
const $query = document.querySelector('#query');
const jikan = 'https://api.jikan.moe/v4/anime?q=';

function searchFor(event) {
  event.preventDefault();
  const url = jikan + $query.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    // console.log(xhr.status);
    // console.log(xhr.response);
    for (let i = 0; i < xhr.response.data.length; i++) {
      const $li = document.createElement('li');
      $li.setAttribute('class', 'column-third');

      const $img = document.createElement('img');
      $img.setAttribute('src', xhr.response.data[i].images.webp.image_url);
      $li.appendChild($img);

      const $p = document.createElement('p');
      $p.setAttribute('class', 'title');
      $p.textContent = xhr.response.data[i].title_english;
      $li.appendChild($p);

      $ul.appendChild($li);
    }
  });
  xhr.send();
  viewSwap('search-results');
}

$searchButton.addEventListener('click', searchFor);

const $home = document.querySelector('.home');
const $searchResults = document.querySelector('.search-results');

function viewSwap(viewName) {
  if (viewName === 'search-results') {
    $home.className = 'home hidden';
    $searchResults.className = 'search-results';
  } else if (viewName === 'home') {
    $searchResults.className = 'search-results hidden';
    $home.className = 'home';
  }
  data.view = viewName;
}
