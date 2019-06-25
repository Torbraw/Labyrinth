import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import Swal from 'sweetalert2';
import {Cell} from '../models/cell';
import {CellCheck} from '../models/cell-check';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  nbRows : string = '10';
  nbCols : string = '10';
  errorRow = '';
  errorCol = '';
  rowArray = [];
  colArray = [];
  needReset = false;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  validInput($event: KeyboardEvent) {
    if ($event != null && $event.key === 'Enter') {
      this.go();
    } else {
      const regex = '^[0-9]+$';
      const row = parseInt(this.nbRows);
      const col = parseInt(this.nbCols);

      if (!this.nbRows.match(regex)) {
        this.errorRow = this.translate.instant('input.warning');
      } else {
        this.errorRow = '';
        if (row < 10) {
          this.errorRow = this.translate.instant('input.warning');
        } else if (row > 50) {
          this.errorRow = this.translate.instant('input.warning');
        } else {
          this.errorRow = '';
        }
      }

      if (!this.nbCols.match(regex)) {
        this.errorCol = this.translate.instant('input.warning');
      } else {
        this.errorCol = '';
        if (col < 10) {
          this.errorCol = this.translate.instant('input.warning');
        } else if (col > 50) {
          this.errorCol = this.translate.instant('input.warning');
        } else {
          this.errorCol = '';
        }
      }
    }
  }

  async go() {
    this.validInput(null);
    if (this.errorRow == '' && this.errorCol == '') {
      if (this.needReset) {
        this.reset();
      }
      this.rowArray = new Array(parseInt(this.nbRows));
      this.colArray = new Array(parseInt(this.nbCols));
      Swal.fire({
        title: this.translate.instant('swal.waitTitle'),
        text: this.translate.instant('swal.waitText'),
        showConfirmButton: false,
        type: 'info',
        customClass: {
          title: 'swal_title'
        },
        allowEnterKey: false,
        allowEscapeKey: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });
      //Obligated if we want to let time for the grid to be build
      //It's ugly, I know.
      await new Promise(resolve => setTimeout(resolve, 0));
      this.generateLab();
      this.needReset = true;
    }
  }

  generateLab() {
    //Generate the lab
    const nbCells = ((parseInt(this.nbRows)) * (parseInt(this.nbCols))) -1;
    let s = Math.floor(Math.random() * (parseInt(this.nbCols) - 1) + 1);
    let start: Cell = new Cell(0,s);
    //remove top border for the enter
    let startCell = document.getElementById('cell' + start.toString());
    startCell.style.borderTop = '0';
    let stack = [];
    let historyTab = [];
    stack.push(start);
    historyTab.push(start);
    let current: Cell = new Cell(-1,-1);
    while (current.toString() != start.toString()) {
      if (current.toString() == '-1.-1') {
        current = start;
      }
      let row = current.row;
      let col = current.col;
      //Check the adjacent cells
      let validTab = this.checkCells(row,col,historyTab);
      //If the tab don't contains cells, return to the last one
      if (validTab.length == 0) {
        stack.pop();
        current = stack[stack.length - 1];
      } else {
        //Get nextCell
        let rnd = Math.floor(Math.random() * (validTab.length));
        let nextCell = validTab[rnd];
        //Remove border
        let currentCell = document.getElementById('cell' + current.toString());
        this.openWall(nextCell, currentCell);
        //Set the current for the next one and put it in histTab
        current = nextCell.cell;
        historyTab.push(current);
        stack.push(current);
      }
    }
    //Remove bot border for the end
    let e = Math.floor(Math.random() * (parseInt(this.nbCols) - 1) + 1);
    let end: Cell = new Cell(parseInt(this.nbRows) -1,e);
    let endCell = document.getElementById('cell' + end.toString());
    endCell.style.borderBottom = '0';
    Swal.close();
  }

  checkCells(row, col, historyTab) {
    let validTab = [];
    //check top
    if (row > 0) {
      let top = new Cell((row - 1), col);
      let indexTop = (historyTab.filter(cell => cell.toString() == top.toString())).length;
      if (indexTop == 0) {
        validTab.push(new CellCheck(top,"top"));
      }
    }
    //check right
    if (col < parseInt(this.nbCols) - 1) {
      let right = new Cell(row, (col + 1));
      let indexRight = (historyTab.filter(cell => cell.toString() == right.toString())).length;
      if (indexRight == 0) {
        validTab.push(new CellCheck(right,"right"));
      }
    }
    //check left
    if (col > 0) {
      let left = new Cell(row, (col - 1));
      let indexLeft = (historyTab.filter(cell => cell.toString() == left.toString())).length;
      if (indexLeft == 0) {
        validTab.push(new CellCheck(left,"left"));
      }
    }
    //check bot
    if (row < parseInt(this.nbRows) - 1) {
      let bot = new Cell((row + 1), col);
      let indexBot = (historyTab.filter(cell => cell.toString() == bot.toString())).length;
      if (indexBot == 0) {
        validTab.push(new CellCheck(bot,"bot"));
      }
    }
    return validTab;
  }

  openWall(nextCell, currentCell) {
    //Remove the border given which direction
    let newCell = document.getElementById('cell' + nextCell.cell.toString());
    if (nextCell.position === 'top') {
      currentCell.style.borderTop = '0';
      newCell.style.borderBottom = '0';
    } else if (nextCell.position === 'right') {
      currentCell.style.borderRight = '0';
      newCell.style.borderLeft = '0';
    } else if (nextCell.position === 'left') {
      currentCell.style.borderLeft = '0';
      newCell.style.borderRight = '0';
    } else {
      currentCell.style.borderBottom = '0';
      newCell.style.borderTop = '0';
    }
  }

  reset() {
    //Pretty nasty, didn't look up if there was a better way
    this.needReset = false;
  }
}
