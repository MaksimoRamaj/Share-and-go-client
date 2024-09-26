import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-find-post',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './find-post.component.html',
  styleUrl: './find-post.component.css'
})
export class FindPostComponent {

  constructor(
    private router : Router
  ) { } 

  onGjejUdhetim(){
      this.router.navigate(['find-trip']);
  }   

  onPostoUdhetim(){
      this.router.navigate(['driver']);
  }

}
