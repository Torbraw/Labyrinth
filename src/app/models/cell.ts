export class Cell {
  public row: number;
  public col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  toString(){
    return this.row + '.' + this.col;
  }
}
