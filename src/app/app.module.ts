import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImporterComponent } from './importer/importer.component';
import { ButtonComponent } from './button/button.component';
import { EditorComponent } from './editor/editor.component';
import { CellComponent } from './cell/cell.component';
import { FormsModule } from '@angular/forms';
import { TableHeaderComponent } from './table-header/table-header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ExporterComponent } from './exporter/exporter.component';
import { CsvConverterService } from './services/csv-converter.service';

@NgModule({
  declarations: [
    AppComponent,
    ImporterComponent,
    ButtonComponent,
    EditorComponent,
    CellComponent,
    TableHeaderComponent,
    NavbarComponent,
    ExporterComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [CsvConverterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
