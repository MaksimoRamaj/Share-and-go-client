import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tripdetails',
  standalone: true,
  imports: [],
  templateUrl: './tripdetails.component.html',
  styleUrl: './tripdetails.component.css'
})
export class TripdetailsComponent implements OnInit{

  id : number = 0;

  constructor(private route: ActivatedRoute, private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id')!);
    });

    this.http.get('http://localhost:8080/api/trip/'+this.id).subscribe((data) => {
      console.log(data);
    });
  }

}
