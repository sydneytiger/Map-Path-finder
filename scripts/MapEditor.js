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
    paint a cell with color by cell type
    cell type:
    start           => level 0
    end             => level 0
    wall            => level 0
    bfsPath         => level 1
    optiomisePath   => level 1
    bfsSearch       => level 2
    optimiseSearch  => level 2

    high level cannot overwrite low level color
  */
  paintCell(cell, cellType) {
    const cellTypes = {
      start: { color: 'red', level: 0 },
      end: { color: 'blue', level: 0 },
      wall: { color: 'black', level: 0 },
      bfsSearch: { color: 'lightgreen', level: 3 },
      bfsPath: { color: 'purple', level: 1 },
      optimisePath: { color: 'orange', level: 1 },
      optimiseSearch: { color: 'lightskyblue', level: 2 },
      empty: { color: 'lightgrey', level: 999 }
    }

    const nextType = cellTypes[cellType];
    if(!nextType) return;
    
    const prevType = cellTypes[cell.getAttribute('cell-type')];

    if(!prevType) {
      cell.setAttribute('cell-type', cellType);
      cell.style.backgroundColor = nextType.color;
    } else {
      if(nextType.level < prevType.level) {
        cell.setAttribute('cell-type', cellType);
        cell.style.backgroundColor = nextType.color;
      } else if(nextType.level === prevType.level && prevType.level === 1) {
        cell.style.backgroundColor = 'yellow';
      }
    }
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
      this.paintCell(cell, 'wall');
    } else {
      this.paintCell(cell, 'empty');
    }

    cell.addEventListener('mousemove', () => {
      if(this.isMouseDown) {
        if(this.isClearMode) {
          this.paintCell(cell, 'empty');
          this.mapArray[mapIndex] = 0;
        } else {
          this.paintCell(cell, 'wall');
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
      this.paintCell(startDot, 'start');
    }

    // paint the end point
    if(this.endPoint) {
      const endIndex = this.getMapIndex(this.endPoint[0], this.endPoint[1]);
      const endDot = this.container.children[endIndex];
      this.paintCell(endDot, 'end');
    }

    return this.container;
  }

}
