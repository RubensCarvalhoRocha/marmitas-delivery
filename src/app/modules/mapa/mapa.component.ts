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
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, ButtonModule, InputTextModule],
})
export class MapaComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  @Output() enderecoSelecionado = new EventEmitter<any>();

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
          const addressComponents = results[0].address_components;
          const formattedAddress = results[0].formatted_address;

          // Extrair os dados importantes
          const endereco = {
            enderecoCompleto: formattedAddress,
            rua: this.getComponent(addressComponents, 'route'),
            numero: this.getComponent(addressComponents, 'street_number'),
            cep: this.getComponent(addressComponents, 'postal_code'),
            cidade: this.getComponent(
              addressComponents,
              'administrative_area_level_2'
            ),
            estado: this.getComponent(
              addressComponents,
              'administrative_area_level_1'
            ),
            pais: this.getComponent(addressComponents, 'country'),
            latitude: results[0].geometry.location.lat(), // Pega a latitude
            longitude: results[0].geometry.location.lng(),
          };

          // Emitir o endereço para o componente pai
          this.enderecoSelecionado.emit(endereco);
        } else {
          console.error('Erro ao obter o endereço:', status);
        }
      });
    }
  }

  private getComponent(components: any[], type: string): string | undefined {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : undefined;
  }
}
