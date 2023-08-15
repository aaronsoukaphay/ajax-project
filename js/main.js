const $ul = document.querySelector('ul');

// function getSearchData(search) {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://api.jikan.moe/v4/anime?q=one-piece');
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', () => {
//     console.log(xhr.status);
//     console.log(xhr.response);
//     for (let i = 0; i < xhr.response.data.length; i++) {
//       const $li = document.createElement('li');
//       $li.setAttribute('class', 'column-third');

//       const $img = document.createElement('img');
//       $img.setAttribute('src', xhr.response.data[i].images.webp.image_url);
//       $li.appendChild($img);

//       const $p = document.createElement('p');
//       $p.setAttribute('class', 'title');
//       $p.textContent = xhr.response.data[i].title_english;
//       $li.appendChild($p);

//       $ul.appendChild($li);
//     }
//   });
//   xhr.send();
// }

// getSearchData();

const $searchButton = document.querySelector('.search-button');
const $query = document.querySelector('#query');
const jikan = 'https://api.jikan.moe/v4/anime?q=';

function submitted(event) {
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
}

$searchButton.addEventListener('click', submitted);
