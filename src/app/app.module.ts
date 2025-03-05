import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Importa esto
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,  // Añádelo en los imports,
    ButtonModule,
    TableModule,
    FormsModule, // Añade FormsModule a los imports
    ColorPickerModule, // Añade ColorPickerModule a los imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
