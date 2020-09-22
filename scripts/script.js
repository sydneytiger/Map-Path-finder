import PathFinder from './PathFinder.js';

const btnBFS = document.querySelector('#btnBFS');
const btnOptimise = document.querySelector('#btnOptimise');
const btnSave = document.querySelector('#btnSave');
const btnLoadSaved = document.querySelector('#btnLoadSaved');
const btnClear = document.querySelector('#btnClear');
const showProcess = document.querySelector('#showProcess');
const mapContainer = document.querySelector('.map-container');

const finder = new PathFinder(100);
finder.start = [10, 10];
finder.end = [80, 80];
finder.showProcess = showProcess.checked;


document.addEventListener('mousedown', e => {
  finder.mouseDown = true;
  finder.clearMode = (e.which === 3);
});
document.addEventListener('mouseup', () => finder.mouseDown = false);
document.addEventListener('contextmenu', e => e.preventDefault());

btnBFS.addEventListener('click', () => finder.findPath());
btnOptimise.addEventListener('click', () => finder.findPath(true));
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
showProcess.addEventListener('click', e => {
  finder.showProcess = e.target.checked;
});

mapContainer.appendChild(finder.render());

