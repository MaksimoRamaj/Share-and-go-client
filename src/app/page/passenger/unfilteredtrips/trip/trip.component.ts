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
import { HttpClient } from '@angular/common/http';
import { PreferenceResponse } from '../../../../shared/responses/preferenceresponse.model';
import { CarResponse } from '../../../../shared/responses/carresponse.model';
import { ProfileService } from '../../../profile/profile.service';
import { ProfileComponent } from "../../../profile/profile.component";


@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [NavbarComponent, CardsComponent, FooterComponent, DatePipe, CurrencyPipe, DurationPipe, LeafletModule, RezervoformComponent, ProfileComponent],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent implements OnInit{

  trip !: TripResponse;
  preferences : PreferenceResponse[] = [];
  car !: CarResponse; 

  startCity !: City;
  endCity !: City;

  isApplying = this.tripService.isApplying; 

  showProfile = this.usrProfileService.showProfile;
  userId = this.usrProfileService.userId;

  constructor(private tripService : TripserviceService, private http: HttpClient,
    private usrProfileService : ProfileService) {}

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
        },
      });

      this.http.get<PreferenceResponse[]>('http://localhost:8080/api/preference/preferences-by-trip-id?id='+this.tripService.selectedTripId(),
      {observe: 'response'}).subscribe({
        next: (response) => {
          if(response.status === 200){
            if(response.body){
              this.preferences = response.body;
            }
          }else if(response.status === 204){
            console.log('No preferences found for this trip');
          }
        },
        error: (error) => {
          console.log(error);
        }
      });

      this.http.get<CarResponse[]>('http://localhost:8080/api/car/all-cars',{observe: 'response'}).subscribe({
        next: (response) => {
          if(response.status === 200){
            response.body?.forEach(car => {
              if(car.id === this.trip.carId){
                this.car = car;
              }
            });
          }
        },
        error: (error) => {
          console.error(error);
        }
      }); 
  
  }

  showUsrInfo(usrId : number){
    this.usrProfileService.showProfile.set(true);
    this.usrProfileService.userId.set(usrId);
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

