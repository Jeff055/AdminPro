import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

@Injectable()
export class SettingsService {
  ajustes: Ajustes = {
    themeUrl: "assets/css/colors/default.css",
    theme: "default"
  };

  constructor( @Inject(DOCUMENT) private _document ) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
  }

  loadSettings() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
      this.setTheme(this.ajustes.theme);
    } else {
      this.setTheme(this.ajustes.theme);
    }
  }

  setTheme(theme: string) {

    const themeUrl: string = `assets/css/colors/${theme}.css`;
    this._document.getElementById('tema').setAttribute('href', themeUrl);

    this.ajustes.theme = theme;
    this.ajustes.themeUrl = themeUrl;
    this.saveSettings();
  }
}

interface Ajustes {
  themeUrl: string;
  theme: string;
}
