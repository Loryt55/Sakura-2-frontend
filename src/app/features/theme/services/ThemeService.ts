import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDark = false;

  constructor() {
    // recupera preferenza salvata
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      this.isDark = true;
      document.body.classList.add('dark-mode');
    }
  }

  toggle() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-mode', this.isDark);
    localStorage.setItem('darkMode', String(this.isDark));
  }
}
