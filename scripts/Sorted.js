export default class Sorted {
  constructor(data, compare) {
    this.data = data.slice();
    this.compare = compare || ((a, b) => a - b)
  }

  shift() {
    if(!this.data.length) return;

    let min = this.data[0];
    let minIndex = 0;

    for(let i = 1; i < this.data.length; i++) {
      if(this.compare(this.data[i], min) < 0) {
        min = this.data[i];
        minIndex = i;
      }
    }

    this.data[minIndex] = this.data[this.data.length - 1];
    this.data.pop();
    return min;
  }

  push(val) {
    this.data.push(val);
  }

  get length() {
    return this.data.length;
  }
}