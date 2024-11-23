import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth-service.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        const token = response.token; // Esperando a resposta com o token JWT
        if (token) {
          console.log('Autenticado com sucesso!');
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.errorMessage =
          'Falha na autenticação. Verifique suas credenciais.';
        console.error('Erro de autenticação', error);
      }
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
