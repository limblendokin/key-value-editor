import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConverterService } from '../services/converter.service';
import { TableService } from '../services/table.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-exporter',
  templateUrl: './exporter.component.html',
  styleUrls: ['./exporter.component.css'],
})
export class ExporterComponent implements OnInit {
  textarea: string = '';
  exportType: string = 'json';
  visible: boolean = false;
  uiSubscription: Subscription;
  warning: string = '';

  constructor(
    private converterService: ConverterService,
    private uiService: UiService,
    private tableService: TableService
  ) {
    this.uiSubscription = this.uiService.onChange().subscribe((val) => {
      this.visible = val === 'exporter';
      this.update();
    });
  }
  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.uiSubscription.unsubscribe();
  }
  onExportTypeChange(type: string) {
    this.exportType = type;
    this.update();
  }

  ngOnInit(): void {}
  update() {
    this.textarea = this.converterService.getTableText(this.exportType);
    this.warning = this.tableService.hasDuplicateHeaders()
      ? 'Table has duplicate headers. Exporting in *.json format will lead to data loss'
      : '';
  }
  saveFile() {
    const data = this.converterService.getTableText(this.exportType);
    if (!data) {
      console.error('Console.save: No data');
      return;
    }
    const blob = new Blob([data], { type: `text/${this.exportType}` });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
