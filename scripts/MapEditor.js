export default class MapEditor {
  constructor(dimension) {
    this.dimension = dimension;
    this.isMouseDown = false;
    this.isClearMode = false;
    this.startPoint = null;
    this.endPoint = null;
    this.container = null;
    this.initMapArray();
  }

  // set startPoint coordinates
  set start(coordinates) {
    this.startPoint = coordinates;
  }

  // set endPoint coordinates
  set end(coordinates) {
    this.endPoint = coordinates;
  }

  set mouseDown(value) {
    console.log();
    this.isMouseDown = value;
  }

  set clearMode(value) {
    this.isClearMode = value;
  }

  get map() {
    return this.mapArray;
  }

  set map(value) {
    this.mapArray = value;
  }

  initMapArray() {
    if(!this.dimension || typeof this.dimension !== 'number')
      throw Error('dimension must be a number greater then 0');

    this.mapArray = Array(this.dimension * this.dimension).fill(0);
  }

  /*
    Since using one dimension array representing a 2D map, to find out index from
    x axis and y axis value.
  */
  getMapIndex(x, y) {
    return this.dimension * y + x;
  }

  /*
    Creates a a single dot in map.
    0 => empty
    1 => wall (black)
  */
  createCell(x, y) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-x', x);
    cell.setAttribute('data-y', y);

    const mapIndex = this.getMapIndex(x, y);

    if(this.mapArray[mapIndex] === 1) {
      cell.style.backgroundColor = 'black';
    }

    cell.addEventListener('mousemove', () => {
      if(this.isMouseDown) {
        if(this.isClearMode) {
          cell.style.backgroundColor = '';
          this.mapArray[mapIndex] = 0;
        } else {
          cell.style.backgroundColor = 'black';
          this.mapArray[mapIndex] = 1;
        }
      }
    });

    return cell;
  }

  render(){
    // init container
    this.container = document.createElement('div');
    this.container.classList.add('container');

    // draw map into container
    for(let y = 0; y < this.dimension; y++) {
      for(let x= 0; x < this.dimension; x++) {
        this.container.appendChild(this.createCell(x, y));
      }
    }

    // paint the start point
    if(this.startPoint && this.startPoint.length >= 2) {
      const startIndex = this.getMapIndex(this.startPoint[0], this.startPoint[1]);
      const startDot = this.container.children[startIndex];
      startDot.style.backgroundColor = 'red';
      startDot.setAttribute('nopaint', true);
    }

    // paint the end point
    if(this.endPoint) {
      const endIndex = this.getMapIndex(this.endPoint[0], this.endPoint[1]);
      const endDot = this.container.children[endIndex];
      endDot.style.backgroundColor = 'blue';
      endDot.setAttribute('nopaint', true);
    }

    return this.container;
  }

}
