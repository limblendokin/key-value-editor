import { Component, Input, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  @Input() content!: string;
  @Input() rowIndex!: number;
  @Input() colIndex!: number;
  constructor(private tableService: TableService) {}

  ngOnInit(): void {}
  onBlur(e: any): void {
    this.content = e.target.innerText;
    this.tableService.modifyCell(this.rowIndex, this.colIndex, this.content);
  }
}
