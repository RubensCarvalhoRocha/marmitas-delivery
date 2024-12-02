import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaRotaComponent } from './mapa-rota.component';

describe('MapaComponent', () => {
  let component: MapaRotaComponent;
  let fixture: ComponentFixture<MapaRotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaRotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaRotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
