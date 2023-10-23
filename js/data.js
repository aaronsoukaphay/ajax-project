/* exported data */
let data = {
  view: 'home',
  searchResults: [],
  topAnimes: [],
  watchlist: [],
  topUpcoming: [],
  details: [],
  editWatchlist: [],
  editing: null
};

window.addEventListener('beforeunload', handleUnload);

function handleUnload() {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}

window.addEventListener('pagehide', handlePageHide);

function handlePageHide() {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}

const previousDataJSON = localStorage.getItem('javascript-local-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
