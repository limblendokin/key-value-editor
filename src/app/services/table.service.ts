import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Table } from '../Table';
import { JSON_DATA } from '../mock-json-data';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private table: Table = new Table([''], [['']]);
  private subject = new BehaviorSubject<Table>(this.table);
  table$: Observable<Table> = this.subject.asObservable();
  constructor() {}
  getTable(): Table {
    return this.table;
    // return this.subject.asObservable();
  }
  modifyCell(rowIndex: number, colIndex: number, newValue: string) {
    const table = this.table.clone();
    table.modifyCell(rowIndex, colIndex, newValue);
    this.table = table;
    this.subject.next(this.table);
  }
  modifyHeader(index: number, newName: string) {
    const table = this.table.clone();
    table.modifyHeader(index, newName);
    this.table = table;
    this.subject.next(this.table);
  }
  setTable(table: Table) {
    // TODO: make proper adapter
    // TODO: validate input data
    this.table = table;
    this.subject.next(this.table);
  }
  addRow() {
    const table = this.table.clone();
    table.addRow();
    this.table = table;
    this.subject.next(this.table);
  }
  addColumn() {
    const table = this.table.clone();
    table.addColumn();
    this.table = table;
    this.subject.next(this.table);
  }
  deleteRow(index: number) {
    const table = this.table.clone();
    table.deleteRow(index);
    this.table = table;
    this.subject.next(this.table);
  }
  deleteColumn(index: number) {
    const table = this.table.clone();
    table.deleteColumn(index);
    this.table = table;
    this.subject.next(this.table);
  }
}
