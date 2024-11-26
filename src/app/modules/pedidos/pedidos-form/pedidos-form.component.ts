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
  formasPagamento = [
    { label: 'Dinheiro', value: 'dinheiro' },
    { label: 'Cartão de Crédito', value: 'credito' },
    { label: 'Cartão de Débito', value: 'debito' },
    { label: 'PIX', value: 'pix' },
  ];
  marmitas = [
    { label: 'Marmita Pequena', value: 'pequena' },
    { label: 'Marmita Média', value: 'media' },
    { label: 'Marmita Grande', value: 'grande' },
  ];

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
      troco: [false],
      valorTotal: [{ value: '', disabled: true }],
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

  selectedState: any = null;

  states: any[] = [
    { name: 'Arizona', code: 'Arizona' },
    { name: 'California', value: 'California' },
    { name: 'Florida', code: 'Florida' },
    { name: 'Ohio', code: 'Ohio' },
    { name: 'Washington', code: 'Washington' },
  ];

  dropdownItems = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' },
  ];

  cities1: any[] = [];

  cities2: any[] = [];

  city1: any = null;

  city2: any = null;
}
