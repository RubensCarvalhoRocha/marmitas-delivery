import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import {
  GoogleMap,
  MapInfoWindow,
  MapMarker,
  GoogleMapsModule,
} from '@angular/google-maps';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
})
export class MapaComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  center: google.maps.LatLngLiteral = { lat: -15.7801, lng: -47.9292 }; // Coordenadas iniciais (Brasília)
  zoom = 14;
  markerPosition: google.maps.LatLngLiteral | null = null;
  address: string = '';

  ngOnInit() {
    this.initializeAutocomplete();
  }

  initializeAutocomplete() {
    const input = document.getElementById('addressInput') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        this.markerPosition = this.center;
        this.map.panTo(this.center);
        this.address = place.formatted_address || '';
      }
    });
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.center = this.markerPosition;
      this.map.panTo(this.center);
    }
  }

  confirmLocation() {
    if (this.markerPosition) {
      console.log('Localização confirmada:', this.markerPosition);
      // Aqui você pode enviar a localização confirmada para o backend ou realizar outras ações necessárias
    }
  }
}
