import {Cell} from './cell';
import {Position} from './position.enum';

export class CellCheck {
  public cell: Cell;
  public position: Position;

  constructor(cell: Cell, p: Position) {
    this.cell = cell;
    this.position = p;
  }

}
