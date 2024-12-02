import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';

import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { PedidosService } from './pedidos.service';
import { Pedido } from '../../model/pedido';
import { RotasService } from '../rotas/rotas.service';
import { DeliveryPoints } from '../../model/deliveryPoints';
import { RotasComponent } from '../rotas/rotas.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    TableModule,
    FormsModule,
    MenuModule,
    StyleClassModule,
    PanelMenuModule,
    InputTextModule,
    MatDialogModule,
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  selectedPedidos: Pedido[] = [];

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private _router: Router,
    private _service: PedidosService,
    private _rotasService: RotasService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this._service.pedidos$.subscribe((pedidos) => {
      this.pedidos = pedidos;
    });

    // Inicializa a lista de pedidos chamando o serviço
    this._service.listarPedidos().subscribe();
  }

  calcularRota(): void {
    console.log('pedidos selecionados:', this.selectedPedidos);

    // Ponto fixo de origem
    const origem = new DeliveryPoints({
      cliente: 'Endereco Origem',
      pedido: 'inicial',
      pagamento: 'inicio',
      obs: 'inicio',
      address: 'Rua das Flores, 123',
      latitude: -23.55052,
      longitude: -46.633308,
    });

    // Converter pedidos para DeliveryPoints
    const deliveryPoints: DeliveryPoints[] = [
      origem, // Adiciona o ponto de origem como o primeiro item
      ...this.selectedPedidos.map(
        (pedido) =>
          new DeliveryPoints({
            cliente: `${pedido.nomeCliente} (${pedido.cpf})`,
            pedido: `Total: R$${pedido.valorTotal} | Qtd: ${pedido.quantidade} | Obs: ${pedido.obs}`,
            pagamento: `R$${pedido.valorTotal} - ${pedido.pagamento}`,
            obs: pedido.obs,
            address: pedido.enderecoCompleto,
            latitude: pedido.latitude,
            longitude: pedido.longitude,
          })
      ),
    ];

    console.log('pedidos convertidos:', deliveryPoints);

    // Chamar o serviço com os pontos convertidos
    this._rotasService
      .listarPontosDeEntrega(deliveryPoints)
      .subscribe((response) => {
        console.log('Resposta do serviço:', response);

        this._dialog.open(RotasComponent, {
          data: response, // Passa os dados da resposta para o modal
          width: '85vw', // Largura máxima da viewport
          height: '85vh', // Altura máxima da viewport
          maxWidth: '85vw', // Impede limite de largura padrão
          maxHeight: '85vh', // Impede limite de altura padrão
          panelClass: 'full-screen-dialog', // Classe para estilização adicional
        });
      });
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  navegarParaEdicao(id: number): void {
    console.log('Navegando para o pedido com ID:', id); // Debugging
    this._router.navigate([`/pedidos/${id}`]);
  }

  navigateTo(id: string): void {
    this._router.navigate(['/pedidos', id]);
  }
}
