import PathFinder from './PathFinder.js';

const btnSearch = document.querySelector('#btnSearch');
const btnSave = document.querySelector('#btnSave');
const btnLoadSaved = document.querySelector('#btnLoadSaved');
const btnClear = document.querySelector('#btnClear');
const mapContainer = document.querySelector('.map-container');

const finder = new PathFinder(100);
finder.start = [10, 10];
finder.end = [80, 80];
finder.showProcess = true;


document.addEventListener('mousedown', e => {
  finder.mouseDown = true;
  finder.clearMode = (e.which === 3);
});
document.addEventListener('mouseup', () => finder.mouseDown = false);
document.addEventListener('contextmenu', e => e.preventDefault());

btnSearch.addEventListener('click', () => finder.findPath());
btnSave.addEventListener('click', () => {
  localStorage['map'] = JSON.stringify(finder.map);
});
btnLoadSaved.addEventListener('click', () => {
  if(localStorage['map']) {
    finder.map = JSON.parse(localStorage['map']);
  }
  mapContainer.innerHTML = '';
  mapContainer.appendChild(finder.render());
});
btnClear.addEventListener('click', () => {
  finder.initMapArray();
  mapContainer.innerHTML = '';
  mapContainer.appendChild(finder.render());
});

mapContainer.appendChild(finder.render());

