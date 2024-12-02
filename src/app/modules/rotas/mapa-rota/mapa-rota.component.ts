import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  GoogleMap,
  MapInfoWindow,
  MapMarker,
  GoogleMapsModule,
} from '@angular/google-maps';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-mapa-rota',
  templateUrl: './mapa-rota.component.html',
  styleUrls: ['./mapa-rota.component.css'],
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, ButtonModule, InputTextModule],
})
export class MapaRotaComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  @Output() enderecoSelecionado = new EventEmitter<any>();

  center: google.maps.LatLngLiteral = { lat: -15.7801, lng: -47.9292 }; // Coordenadas iniciais (Brasília)
  zoom = 14;
  markerPosition: google.maps.LatLngLiteral | null = null;
  address: string = '';
  private geocoder = new google.maps.Geocoder();

  ngOnInit() {
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

}
