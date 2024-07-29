import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [LeafletModule],
  standalone: true
})
export class MapComponent implements OnInit {


  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 10,
    center: L.latLng(40.61861000, 20.78083000) // Default center (New York)
  };

  private map !: L.Map;
  private startPoint: L.LatLng | null = null;
  private endPoint: L.LatLng | null = null;

  ngOnInit(): void {}

  onMapReady(map: L.Map): void {
    this.map = map;
    this.addRoutingControl();
  }

  addRoutingControl(): void {
    const control = L.Routing.control({
      waypoints: [
        L.latLng(40.70583000, 19.95222000), // New York
        L.latLng(41.3275000, 19.8188900) // Los Angeles
      ],
      routeWhileDragging: true
    }).on('routesfound', (e) => {
      const routes = e.routes;
      const summary = routes[0].summary;
      console.log(`Distance: ${summary.totalDistance / 1000} km`);
      console.log(`Time: ${Math.round(summary.totalTime / 60)} minutes`);
    }).addTo(this.map);
  

  const waypoints = control.getPlan().getWaypoints();
  if (waypoints.length > 0) {
    this.startPoint = waypoints[0].latLng;
    this.endPoint = waypoints[waypoints.length - 1].latLng;
    console.log(`Start Point: ${this.startPoint}`);
    console.log(`End Point: ${this.endPoint}`);
  }
}
}
