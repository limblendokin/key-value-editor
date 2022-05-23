export class Table {
  headers: string[];
  rows: string[][];
  constructor(headers: string[], rows: string[][]) {
    this.headers = headers || [''];
    this.rows = rows || [['']];
  }
  modifyCell(rowIndex: number, colIndex: number, newValue: string): void {
    this.rows[rowIndex][colIndex] = newValue;
  }
  modifyHeader(index: number, newName: string) {
    this.headers[index] = newName;
    console.log('modifying ' + index + ' ' + newName);
    console.log(this.headers);
  }
  clone(): Table {
    console.log('cloning');
    console.log(this);
    const headers = [...this.headers];
    const rows = this.rows.map((row) => [...row]);
    const newTable = new Table(headers, rows);
    console.log(newTable);
    return newTable;
  }
  addRow() {
    const newRow = [];
    for (let i = 0; i < this.headers.length; i++) {
      newRow.push('');
    }
    this.rows.push(newRow);
  }
  addColumn() {
    this.headers.push('');
    this.rows.map((row) => row.push(''));
    console.log('adding column ' + this.headers.length);
  }
  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }
  deleteColumn(index: number) {
    this.headers.splice(index, 1);
    this.rows.map((row) => row.splice(index, 1));
  }
}
