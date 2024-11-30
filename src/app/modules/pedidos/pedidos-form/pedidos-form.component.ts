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
  readonly precoMarmita = 15;
  formasPagamento = [
    { name: 'Dinheiro', code: 'DINHEIRO' },
    { name: 'Cartão Crédito', code: 'CARTAO_CREDITO' },
    { name: 'Cartão Débito', code: 'CARTAO_DEBITO' },
    { name: 'Pix', code: 'PIX' },
  ];

  pedido: Pedido = new Pedido({});

  constructor(private _service: PedidosService) {}

  ngOnInit() {}

  calcularValorTotal(): void {
    const quantidade = this.pedido.quantidade || 0;
    this.pedido.valorTotal = quantidade * this.precoMarmita;
  }

  atualizarEndereco(endereco: any) {
    // Atualiza os dados do endereço no objeto pedido
    Object.assign(this.pedido, endereco);
    console.log('Endereço atualizado no pedido:', this.pedido);
  }

  salvar() {
    this._service.salvarPedido(this.pedido).subscribe({
      next: (pedido) => {
        console.log('Pedido salvo:', pedido);
      },
      error: (error) => {
        // Exibe a mensagem de erro
        alert(error.message); // ou substitua por outra forma de exibição
      },
    });
  }
}
