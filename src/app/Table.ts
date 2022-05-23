export class Table {
  headers: string[];
  rows: string[][];
  constructor(headers?: string[], rows?: string[][]) {
    this.headers = headers || [''];
    this.rows = rows || [['']];
  }
  modifyCell(rowIndex: number, colIndex: number, newValue: string): void {
    this.rows[rowIndex][colIndex] = newValue;
  }
  modifyHeader(index: number, newName: string) {
    this.headers[index] = newName;
  }
  clone(): Table {
    const headers = [...this.headers];
    const rows = this.rows.map((row) => [...row]);
    const newTable = new Table(headers, rows);
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
  }
  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }
  deleteColumn(index: number) {
    this.headers.splice(index, 1);
    this.rows.map((row) => row.splice(index, 1));
  }
}
