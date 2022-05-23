import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConverterService } from '../services/converter.service';
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

  constructor(
    private converterService: ConverterService,
    private uiService: UiService
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
  }
}
