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
  valid: boolean = true;
  file!: File;
  constructor(
    private converterService: ConverterService,
    private uiService: UiService
  ) {
    this.subscription = this.uiService
      .onChange()
      .subscribe((val) => (this.visible = val === 'importer'));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {}
  openEditor(): void {
    let success;
    if (this.file) {
      this.readFile().then(() => {
        this.uiService.setSelected('editor');
      });
    } else {
      success = this.converterService.setTableViaText(this.textarea);
      this.valid = success;
    }
    if (success) {
      this.uiService.setSelected('editor');
    }
  }
  readFile() {
    return new Promise<void>((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = () => {
        const success = this.converterService.setTableViaText(
          (reader.result || '').toString()
        );
        if (success) {
          resolve();
          return;
        }
        reject();
      };
      reader.readAsText(this.file);
    });
  }
  fileChanged(e: any) {
    this.file = e.target.files[0];
  }
}
