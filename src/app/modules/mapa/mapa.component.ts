import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import {
  GoogleMap,
  MapInfoWindow,
  MapMarker,
  GoogleMapsModule,
} from '@angular/google-maps';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, ButtonModule, InputTextModule],
})
export class MapaComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  center: google.maps.LatLngLiteral = { lat: -15.7801, lng: -47.9292 }; // Coordenadas iniciais (Brasília)
  zoom = 14;
  markerPosition: google.maps.LatLngLiteral | null = null;
  address: string = '';
  private geocoder = new google.maps.Geocoder();

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
      const latLng = new google.maps.LatLng(
        this.markerPosition.lat,
        this.markerPosition.lng
      );

      this.geocoder.geocode({ location: latLng }, (results, status) => {
        if (
          status === google.maps.GeocoderStatus.OK &&
          results &&
          results.length > 0
        ) {
          const fullAddress = results[0].formatted_address;
          console.log('Endereço completo:', fullAddress);
          console.log('Detalhes do endereço:', JSON.stringify(results[0], null, 4)); // Contém todos os detalhes, como componentes do endereço
        } else {
          console.error('Erro ao obter o endereço:', status);
        }
      });
    }
  }
}
