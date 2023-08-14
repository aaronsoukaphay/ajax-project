const $searchList = document.querySelector('#search-list');

function getSearchData(search) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/anime?q=bleach');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    // console.log(xhr.status);
    // console.log(xhr.response);
    for (let i = 0; i < xhr.response.data.length; i++) {
      const $newLi = document.createElement('li');

      $newLi.textContent = xhr.response.data[i].title_english;
      $searchList.appendChild($newLi);
    }
  });
  xhr.send();
}

getSearchData();
