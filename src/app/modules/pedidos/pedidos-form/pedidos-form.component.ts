import { Component, OnInit } from '@angular/core';
import { MapaComponent } from '../../mapa/mapa.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pedido } from '../../../model/pedido';
import { PedidosService } from '../pedidos.service';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
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
    NgxMaskDirective,
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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: PedidosService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      const id = params['id'];
      console.log('ID capturado da URL:', id); // Debugging
      if (id && id !== 'novo') {
        this.carregarPedido(id); // Converte o ID para número
        console.log(this.pedido);
      } else {
        console.error('ID não foi capturado da URL.');
      }
    });
  }

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
    if (this.pedido.id) {
      // Caso o pedido já tenha um ID, atualiza o pedido existente
      this._service.atualizarPedido(this.pedido.id, this.pedido).subscribe({
        next: (pedidoAtualizado) => {
          console.log('Pedido atualizado:', pedidoAtualizado);
          alert('Pedido atualizado com sucesso!');
        },
        error: (error) => {
          // Exibe a mensagem de erro
          alert(error.message); // ou substitua por outra forma de exibição
        },
      });
    } else {
      // Caso não tenha um ID, cria um novo pedido
      this._service.salvarPedido(this.pedido).subscribe({
        next: (pedidoCriado) => {
          console.log('Pedido salvo:', pedidoCriado);
          alert('Pedido criado com sucesso!');
        },
        error: (error) => {
          // Exibe a mensagem de erro
          alert(error.message); // ou substitua por outra forma de exibição
        },
      });
    }
  }

  carregarPedido(id: number): void {
    this._service.buscarPedidoPorId(id).subscribe({
      next: (pedido) => {
        console.log('Pedido retornado:', pedido); // Debugging
        this.pedido = pedido; // Atualiza o objeto pedido com os dados retornados
      },
      error: (error) => {
        console.error('Erro ao carregar o pedido:', error); // Tratamento de erro
        alert('Erro ao carregar o pedido: ' + error.message);
      },
    });
  }
}
