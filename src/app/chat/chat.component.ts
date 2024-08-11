import { Component } from '@angular/core';
import { ChatlistComponent } from "./chatlist/chatlist.component";
import { ChatwindowComponent } from "./chatwindow/chatwindow.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatlistComponent, ChatwindowComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  isChatOpen: boolean = false;

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    console.log('Chat is open:', this.isChatOpen);
  }

}
