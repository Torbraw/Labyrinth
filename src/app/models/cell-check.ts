import {Cell} from './cell';

export class CellCheck {
  public cell: Cell;
  public position: string;

  constructor(cell: Cell, p: string) {
    this.cell = cell;
    this.position = p;
  }

}
