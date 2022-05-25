import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Table } from '../Table';
import { TableService } from '../services/table.service';
import { UiService } from '../services/ui.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  table: Table = new Table([], []);
  visible: boolean = false;
  subscription: Subscription;
  constructor(
    private tableService: TableService,
    private uiService: UiService
  ) {
    this.subscription = this.uiService
      .onChange()
      .subscribe((val) => (this.visible = val === 'editor'));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.tableService.table$.subscribe((table) => (this.table = table));
  }
  addRow() {
    this.tableService.addRow();
  }
  addColumn() {
    this.tableService.addColumn();
  }
  deleteRow(index: number) {
    this.tableService.deleteRow(index);
  }
  deleteColumn(index: number) {
    this.tableService.deleteColumn(index);
  }
  trackByIndex(index: number): TrackByFunction<number> {
    return () => index;
  }
}
