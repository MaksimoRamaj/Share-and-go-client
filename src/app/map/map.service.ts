import { Injectable, signal, WritableSignal } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { City } from '../shared/city.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {


  startCity : WritableSignal<City> = signal({
    name: "Berat", lat: 40.7058, lng: 19.9522  
    });

    endCity : WritableSignal<City> = signal({
      name: 'Korce',
      lat: 40.6275,
      lng: 20.9897
    });  


  constructor() { }

  getMap() {
    return {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap contributors'
        })
      ],
      zoom: 10,
      center: L.latLng(40.61861000, 20.78083000) // Default center (New York)
    };
  }

  getMapReady(map: L.Map) {
    let startPoint: L.LatLng | null = null;
    let endPoint: L.LatLng | null = null;
    let control = L.Routing.control({
      waypoints: [
        L.latLng(40.6275, 20.9897), // New York
        L.latLng(41.3275000, 19.8188900) // Los Angeles
      ],
      routeWhileDragging: true
    }).on('routesfound', (e) => {
      const routes = e.routes;
      const summary = routes[0].summary;
      console.log(`Distance: ${summary.totalDistance / 1000} km`);
      console.log(`Time: ${Math.round(summary.totalTime / 60)} minutes`);
    }).addTo(map);

    const waypoints = control.getPlan().getWaypoints();
    if (waypoints.length > 0) {
      startPoint = waypoints[0].latLng;
      endPoint = waypoints[waypoints.length - 1].latLng;
      console.log(`Start Point: ${startPoint}`);
      console.log(`End Point: ${endPoint}`);
    }
  }
}
