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
  errors: string[] = [];
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
  async openEditor(): Promise<void> {
    let errors;
    if (this.file) {
      errors = await this.readFile();
    } else {
      errors = this.converterService.setTableViaText(this.textarea);
    }
    this.errors = errors;
    if (errors.length === 0) {
      this.uiService.setSelected('editor');
    }
  }
  readFile() {
    return new Promise<string[]>((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = () => {
        const error = this.converterService.setTableViaText(
          (reader.result || '').toString()
        );
        if (error) {
          resolve(error);
          return;
        }
        //reject();
      };
      reader.readAsText(this.file);
    });
  }
  fileChanged(e: any) {
    this.file = e.target.files[0];
  }
}
