import { Component, OnInit } from '@angular/core';
import { LangServiceService } from '../lang-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css'
})
export class LanguagesComponent implements OnInit{

  isLanguageSelectorVisible = this.langs.isLanguageSelectorVisible;

  constructor(private langs : LangServiceService) { }

  ngOnInit(): void {
    
  }

  selectLanguage(lang: string){
    this.langs.changeLanguage(lang);
    this.langs.isLanguageSelectorVisible.set(false);
  }

  toggleLanguageSelector(){
    
      this.langs.toggleLanguageSelector();
  }

}
