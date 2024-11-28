import { Component, OnInit } from '@angular/core';
import { MapaComponent } from '../../mapa/mapa.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Pedido } from '../../../model/pedido';
import { PedidosService } from '../pedidos.service';

@Component({
  selector: 'app-pedidos-form',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    MapaComponent,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    ButtonModule,
    CommonModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    RouterModule,
  ],
  templateUrl: './pedidos-form.component.html',
  styleUrl: './pedidos-form.component.css',
})
export class PedidosFormComponent implements OnInit {
  formasPagamento = [
    { name: 'Dinheiro', code: 'DINHEIRO' },
    { name: 'Cartão Crédito', code: 'CARTAO_CREDITO' },
    { name: 'Cartão Débito', code: 'CARTAO_DEBITO' },
    { name: 'Pix', code: 'PIX' },
  ];

  pedido: Pedido = new Pedido({});

  constructor(private _service: PedidosService) {}

  ngOnInit() {}

  onSubmit() {
    this._service.salvarPedido(this.pedido).subscribe((pedido) => {
      console.log('Pedido salvo:', pedido);
    });
  }
}
