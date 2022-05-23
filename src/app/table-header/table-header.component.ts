import { Component, Input, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css'],
})
export class TableHeaderComponent implements OnInit {
  @Input() content!: string;
  @Input() index!: string;

  constructor(private tableService: TableService) {}

  ngOnInit(): void {}
  onBlur(e: any): void {
    this.content = e.target.innerText;
    this.tableService.modifyHeader(+this.index, this.content);
  }
}
