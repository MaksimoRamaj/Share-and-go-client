import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../../navbars/navbar/navbar.component";
import { CardsComponent } from "../../../../cards/cards.component";
import { FooterComponent } from "../../../../footer/footer.component";
import { TripResponse } from '../../../../shared/responses/tripresponse.model';
import { TripserviceService } from './tripservice.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { City } from '../../../../shared/city.model';
import { citiesArray } from '../../../../shared/citiesArray.model';
import { RezervoformComponent } from "./rezervoform/rezervoform.component";

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [NavbarComponent, CardsComponent, FooterComponent, DatePipe, CurrencyPipe, DurationPipe, LeafletModule, RezervoformComponent],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent implements OnInit{

  trip !: TripResponse;

  startCity !: City;
  endCity !: City;

  isApplying = this.tripService.isApplying; 

  constructor( private tripService : TripserviceService) { }

  ngOnInit(): void {
    this.tripService.getTripByTripId(this.tripService.selectedTripId())
    .subscribe(
      {
        next: (data) => {
          this.trip = data;
          this.tripService.trip = data;
          this.startCity = this.findCityByName(data.startCity);
          this.endCity = this.findCityByName(data.endCity);
          this.updateRoutingControl()
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  toggle(){
    console.log("Toggling" + this.isApplying());
    this.tripService.toggle();
  }

  findCityByName(cityName: string): City {
    return citiesArray.find(city => city.name === cityName)!;
  }

  //map

  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 10,
    center: L.latLng(40.7058, 19.9522)
  };

  private map!: L.Map;
  private routingControl!: L.Routing.Control;
  onMapReady(map: L.Map): void {
    this.map = map;
    this.addRoutingControl();
  }

  addRoutingControl(): void {
    this.routingControl = L.Routing.control({
      waypoints: [
        L.latLng(40.7058, 19.9522), 
        L.latLng(40.6275, 20.9897)
      ],
      routeWhileDragging: true
    }).on('routesfound', (e) => {
      const routes = e.routes;
      const summary = routes[0].summary;
      console.log(`Distance: ${summary.totalDistance / 1000} km`);
      console.log(`Time: ${Math.round(summary.totalTime / 60)} minutes`);
    }).addTo(this.map);
    this.updateRoutingControl();
  }

  updateRoutingControl(): void {
    if (this.routingControl) {
      console.log("Updating ro")
      this.routingControl.setWaypoints([
        L.latLng(this.startCity.lat, this.startCity.lng),
        L.latLng(this.endCity.lat, this.endCity.lng)
      ]);
    }
  }
}

