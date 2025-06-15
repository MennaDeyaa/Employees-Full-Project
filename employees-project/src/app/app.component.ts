import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet , TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employees-project';
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
       this.setDirection('en'); 
  };
   setDirection(lang: string) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(dir);
  }
}
