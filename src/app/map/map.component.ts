import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
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
    center: L.latLng(40.7128, -74.0060) // Default center (New York)
  };

  private map !: L.Map;

  ngOnInit(): void {}

  onMapReady(map: L.Map): void {
    this.map = map;
    this.addRoutingControl();
  }

  addRoutingControl(): void {
    L.Routing.control({
      waypoints: [
        L.latLng(40.7128, -74.0060), // New York
        L.latLng(34.0522, -118.2437) // Los Angeles
      ],
      routeWhileDragging: true
    }).on('routesfound', (e) => {
      const routes = e.routes;
      const summary = routes[0].summary;
      console.log(`Distance: ${summary.totalDistance / 1000} km`);
      console.log(`Time: ${Math.round(summary.totalTime / 60)} minutes`);
    }).addTo(this.map);
  }
}
