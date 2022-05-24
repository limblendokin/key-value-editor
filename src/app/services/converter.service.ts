import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Table } from '../Table';
import { CsvConverterService } from './csv-converter.service';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  convertedToJson: string = '';
  convertedToCsv: string = '';
  convertedToJsonSubject = new Subject<string>();
  convertedToCsvSubject = new Subject<string>();
  constructor(
    private tableService: TableService,
    private csvConverterService: CsvConverterService
  ) {}
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
    const concatinatedTable = [table.headers, ...table.rows];
    const maxLength = concatinatedTable.reduce(
      (acc, cv) => (acc = Math.max(acc, cv.length)),
      0
    );
    return concatinatedTable
      .map((row) => {
        return row
          .map((str) =>
            // if string has qoutation marks, commas, trailing or ending spaces,
            // surround it with qoutation marks and double quotation marks within origin string
            /[",]/.test(str) || str[0] == ' ' || str[str.length - 1] == ' '
              ? '"' + str.replace(/"/g, '""') + '"'
              : str
          )
          .concat(([] as string[]).fill('', 0, maxLength - row.length))
          .join(',');
      })
      .join('\n');
  }

  setTableViaText(text: string) {
    let table: Table;
    let tryCsv = false;
    try {
      table = this.tableFromJson(text);
    } catch (e) {
      console.error(e);
      tryCsv = true;
    }
    try {
      table = this.tableFromCsv(text);
    } catch (e) {
      console.error(e);
      return false;
    }
    this.tableService.setTable(table);
    return true;
  }
  tableFromJson(json: string): Table {
    const jsonData = JSON.parse(json);
    if (!jsonData || jsonData.length == 0) {
      return new Table();
    }
    const headers: string[] = Object.keys(jsonData[0]);
    const rows: string[][] = jsonData.map((rowObj: any) =>
      headers.map((key: string) => rowObj[key])
    );
    return new Table(headers, rows);
  }
  tableFromCsv(csv: string): Table {
    const [headers, ...rows] = this.csvConverterService.parse(csv);
    return new Table(headers, rows);

    // const [headers, ...rows] = csv
    //   .split('\n')
    //   .filter((str) => str) // filter empty strings
    //   .map((arr) => arr.split(','));
    // return new Table(headers, rows);
  }
}
