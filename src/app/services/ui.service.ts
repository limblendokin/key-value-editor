import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private selected: string = 'importer';
  private exportType: string = 'json';
  private subject = new BehaviorSubject<string>(this.selected);
  private exportTypeSubject = new BehaviorSubject<string>(this.exportType);
  constructor() {}
  setSelected(name: string) {
    this.selected = name;
    this.subject.next(this.selected);
  }
  setExportType(name: string) {
    this.exportType = name;
    this.exportTypeSubject.next(this.exportType);
  }
  onChange() {
    return this.subject.asObservable();
  }
  onExportTypeChange() {
    return this.exportTypeSubject.asObservable();
  }
}
