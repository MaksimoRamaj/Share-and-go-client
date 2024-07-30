import { Component, inject, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { CityService } from '../shared/city.service';
import { City } from '../shared/city.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [LeafletModule],
  standalone: true
})
export class MapComponent implements OnInit {

  private cityService = inject(CityService);

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

  ngOnInit(): void {
    this.cityService.startCity$.subscribe(startCity => {
      this.updateRoutingControl();
    });
    this.cityService.endCity$.subscribe(endCity => {
      this.updateRoutingControl();
    });
  }

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
  }

  updateRoutingControl(): void {
    if (this.routingControl) {
      const startCity = this.cityService.startCitySubject.value;
      const endCity = this.cityService.endCitySubject.value;
      this.routingControl.setWaypoints([
        L.latLng(startCity.lat, startCity.lng),
        L.latLng(endCity.lat, endCity.lng)
      ]);
    }
  }
}
