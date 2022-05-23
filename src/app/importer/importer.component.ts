import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConverterService } from '../services/converter.service';
import { UiService } from '../services/ui.service';
@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.css'],
})
export class ImporterComponent implements OnInit {
  textarea: string = '';
  visible: boolean = false;
  subscription: Subscription;
  constructor(
    private converterService: ConverterService,
    private uiService: UiService
  ) {
    this.subscription = this.uiService
      .onChange()
      .subscribe((val) => (this.visible = val === 'importer'));
  }

  ngOnInit(): void {}
  openEditor(): void {
    this.converterService.setTableViaText(this.textarea);
    this.uiService.setSelected('editor');
  }
}
