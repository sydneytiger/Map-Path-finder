import MapEditor from './MapEditor.js';

export default class PathFinder extends MapEditor {
  constructor(dimension = 100){
    super(dimension);
    this.showProcess = false;
  }

  sleep(time) {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }

  async searchProcess(index) {
    // 寻址过程渲染
    await this.sleep(30);
    const point = this.container.children[index];

    if(point.style.backgroundColor === '') {
      point.style.backgroundColor = 'lightgreen';
    }
  }

  async findPath() {
    const table = Object.create(this.mapArray);
    const queue = [this.startPoint];

    const insert = async (x, y, prev) => {
      const index = this.getMapIndex(x, y);
      // 边缘检测
      if(x < 0 || x >= this.dimension || y < 0 || y >= this.dimension) return;
      // 障碍物检测
      if(table[index]) return;

      if(this.showProcess) this.searchProcess(index);

      // 寻址标记前驱节点 避免重复寻找
      table[index] = prev;
      queue.push([x, y]);
    }



    // BFS
    while(queue.length) {
      let [x, y] = queue.shift();

      // 判断是否是终点
      if( x === this.endPoint[0] && y === this.endPoint[1]) {
        const path = [];

        // 到达终点 开始通过记录的前驱节点反向推导出路径
        while(x !== this.startPoint[0] || y !== this.startPoint[1]) {
          const index = this.getMapIndex(x, y);
          path.push(this.mapArray[index]);
          [x, y] = table[index];
          await this.sleep(30);
          this.container.children[index].style.backgroundColor = 'orange';
        }

        return path;
      }

      // 四向扩散
      await insert(x - 1, y, [x, y]);
      await insert(x, y - 1, [x, y]);
      await insert(x + 1, y, [x, y]);
      await insert(x, y + 1, [x, y]);

      // 斜向扩散
      await insert(x - 1, y - 1, [x, y]);
      await insert(x + 1, y - 1, [x, y]);
      await insert(x - 1, y + 1, [x, y]);
      await insert(x + 1, y + 1, [x, y]);
    }

    return null;
  }
}
