import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FindTripFormComponent } from "./forms/find-trip-form/find-trip-form.component";
import { CardsComponent } from "./cards/cards.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from './navbars/navbar/navbar.component';
import { OfferDriveFormComponent } from './forms/offer-drive-form/offer-drive-form.component';
import { MapComponent } from "./map/map.component";
import { HomepageComponent } from "./page/homepage/homepage.component";
import { ChatComponent } from "./chat/chat.component";

import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
import { CometChatUIKit } from "@cometchat/chat-uikit-angular";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguagesComponent } from "./languages/languages/languages.component";

const COMETCHAT_CONSTANTS = {
  APP_ID: "26302336c44da3eb", //Replace with your App ID
  REGION: "eu", //Replace with your App Region
  AUTH_KEY: "f6d9f7d43e932d40c08fc94edf6df1b6e0c6570a", //Replace with your Auth Key
};

const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule, OfferDriveFormComponent, RouterOutlet, FindTripFormComponent, CardsComponent, FooterComponent, NavbarComponent, MapComponent, HomepageComponent, ChatComponent, LanguagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  languages = ['al', 'en'];
  
  private translate = inject(TranslateService);

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  ngOnInit(): void {
    CometChatUIKit.init(UIKitSettings)!
  .then(() => {
    console.log("Initialization completed successfully");
    // You can now call login function.
  })
  .catch(console.log);
  const defaultLang = localStorage.getItem('language') || 'al';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
  }
  
  title = 'carpool';

}
