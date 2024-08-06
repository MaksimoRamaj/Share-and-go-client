import { Component } from '@angular/core';
import { VeturatService } from '../veturat.service';

@Component({
  selector: 'app-removecarform',
  standalone: true,
  imports: [],
  templateUrl: './removecarform.component.html',
  styleUrl: './removecarform.component.css'
})
export class RemovecarformComponent {
  constructor(private veturatService : VeturatService) { }

  toggle(){ 
    this.veturatService.toggleRemoveCarForm();
  }
}
