import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-rotas',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './rotas.component.html',
  styleUrl: './rotas.component.css',
})
export class RotasComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
