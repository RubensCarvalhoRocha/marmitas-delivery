import { Routes } from '@angular/router';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { AppLayoutComponent } from './layout/app.layout.component';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { PedidosComponent } from './page/pedidos/pedidos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //Rotas não autenticadas
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },

  //Rotas autenticadas
  {
    path: 'pedidos',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: '',
        component: PedidosComponent,
        data: { roles: ['ROLE_ADMIN'] },
      },
    ],
  },
];
