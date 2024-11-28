import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];

  @ViewChild('filter') filter!: ElementRef;

  constructor(private router: Router, private _service: PedidosService) {}
  ngOnInit(): void {
    this._service.pedidos$.subscribe((pedidos) => {
      this.pedidos = pedidos;
    });

    // Inicializa a lista de pedidos chamando o serviço
    this._service.listarPedidos().subscribe();
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  verDetalhes(pedido: Pedido): void {
    console.log('Detalhes do Pedido:', pedido);
    // Implementação adicional, como abrir um modal
  }

  navigateTo(id: string): void {
    this.router.navigate(['/pedidos', id]);
  }
}
