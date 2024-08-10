import { Component } from '@angular/core';
import { InfiniteScrollDirective, InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-chatwindow',
  standalone: true,
  imports: [InfiniteScrollDirective],
  templateUrl: './chatwindow.component.html',
  styleUrl: './chatwindow.component.css'
})
export class ChatwindowComponent {

  onScroll(event : any) {
    console.log('scrolled!!' + event);
    const element = event.target;

    // Check if the user has scrolled to the bottom
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        // Trigger your action here, e.g., load more messages
        console.log('Scrolled to the bottom!');
    }
  }

}
