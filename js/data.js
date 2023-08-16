/* exported data */
let data = {
  view: 'home',
  topAnimes: [],
  watchlist: [],
  selected: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', handleUnload);

function handleUnload() {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}

const previousDataJSON = localStorage.getItem('javascript-local-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
