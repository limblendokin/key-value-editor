import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Table } from '../Table';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  convertedToJson: string = '';
  convertedToCsv: string = '';
  convertedToJsonSubject = new Subject<string>();
  convertedToCsvSubject = new Subject<string>();
  constructor(private tableService: TableService) {}
  getTableText(format: string): string {
    const table = this.tableService.getTable();
    return format === 'json'
      ? this.jsonFromTable(table)
      : this.csvFromTable(table);
  }
  jsonFromTable(table: Table): string {
    const json: any[] = [];
    table.rows.forEach((row: string[]) => {
      const obj: any = {};
      table.headers.forEach(
        (key: string, colIndex) => (obj[key] = row[colIndex])
      );
      json.push(obj);
    });
    return JSON.stringify(json);
  }
  csvFromTable(table: Table): string {
    const concatedTable = [table.headers, ...table.rows];
    return concatedTable.map((row) => row.join(',')).join('\n');
  }
  setTableViaText(text: string) {
    let table: Table;
    try {
      table = this.tableFromJson(text);
    } catch (e) {
      table = this.tableFromCsv(text);
    }
    this.tableService.setTable(table);
  }
  tableFromJson(json: string): Table {
    const jsonData = JSON.parse(json);

    const headers: string[] = Object.keys(jsonData[0]);
    const rows: string[][] = jsonData.map((rowObj: any) =>
      headers.map((key: string) => rowObj[key])
    );
    return new Table(headers, rows);
  }
  tableFromCsv(csv: string): Table {
    const [headers, ...rows] = csv.split('\n').map((arr) => arr.split(','));
    return new Table(headers, rows);
  }
}
