import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
  constructor(private router: Router) {}

  navigateTo(id: string): void {
    this.router.navigate(['/pedidos', id]);
  }
}
