import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@NgModule({
  declarations: [],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: []
})
export class AppModule { }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fileContent: string = '';
  originalContent: string = '';
  fileName: string = 'data.txt';
  isDarkMode: boolean = false;

  constructor() {}

  ngOnInit() {
    this.loadFile();
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';

    this.applyTheme();

  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyTheme();
  }

  applyTheme() {
    document.documentElement.style.setProperty('--bg-color', this.isDarkMode ? '#121212' : '#f8f9fa');
    document.documentElement.style.setProperty('--text-color', this.isDarkMode ? 'white' : '#333');
    document.documentElement.style.setProperty('--container-bg', this.isDarkMode ? '#333' : '#ffffff');
    document.documentElement.style.setProperty('--btn-bg', this.isDarkMode ? '#555' : '#e0e0e0');
  }

  async loadFile() {
    try {
      const result = await Filesystem.readFile({
        path: this.fileName,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      this.fileContent = typeof result.data === 'string' ? result.data : '';
      this.originalContent = this.fileContent;
    } catch (error) {
      console.error('Error al leer el archivo, creando uno nuevo.', error);
      await this.createFile();
    }
  }

  async createFile() {
    try {
      await Filesystem.writeFile({
        path: this.fileName,
        data: '',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      this.fileContent = '';
      this.originalContent = '';
    } catch (error) {
      console.error('Error al crear el archivo', error);
    }
  }

  confirmAction(message: string, action: Function) {
    if (confirm(message)) {
      action();
    }
  }

  async saveFile() {
    this.confirmAction('¿Quieres guardar los cambios?', async () => {
      try {
        await Filesystem.writeFile({
          path: this.fileName,
          data: this.fileContent,
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
        this.originalContent = this.fileContent;
        alert('Archivo guardado con éxito');
      } catch (error) {
        console.error('Error al guardar el archivo', error);
      }
    });
  }
  async deleteFile() {
    this.confirmAction('¿Seguro que quieres borrar el contenido?', async () => {
      this.fileContent = '';
      try {
        await Filesystem.writeFile({
          path: this.fileName,
          data: '',  // Guardar archivo vacío
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
        this.originalContent = ''; // Actualiza la copia original
        alert('Contenido borrado con éxito');
      } catch (error) {
        console.error('Error al borrar el contenido del archivo', error);
      }
    });
  }
  

  undoChanges() {
    this.fileContent = this.originalContent;
  }
}