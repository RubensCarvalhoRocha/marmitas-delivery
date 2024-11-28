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
  form!: FormGroup;
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      id: [null],
      nomeCliente: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      pedido: [[], Validators.required],
      observacao: [''],
      formaPagamento: [null, Validators.required],
      troco: [0],
      valorTotal: [{ value: '', disabled: true }],
      referencia: [''],
      quantidade: [0],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // Adicione a lógica para salvar o pedido
    } else {
      console.error('Formulário inválido');
    }
  }

  selectedMarmita: any = null;
  selectedFormaPagamento: any = null;

  formasPagamento = [
    { name: 'Cartão', code: 'Option 1' },
    { name: 'Pix', code: 'Option 2' },
    { name: 'Dinheiro', code: 'Option 3' },
  ];
}
