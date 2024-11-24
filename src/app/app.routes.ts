import { Routes } from '@angular/router';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { AppLayoutComponent } from './layout/app.layout.component';
import { SignInComponent } from './modules/sign-in/sign-in.component';
import { PedidosComponent } from './modules/pedidos/pedidos.component';
import { RotasComponent } from './modules/rotas/rotas.component';
import { PedidosFormComponent } from './modules/pedidos/pedidos-form/pedidos-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pedidos', pathMatch: 'full' },

  //Rotas não autenticadas
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },

  //Rotas autenticadas
  {
    path: 'pedidos',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },

    children: [
      {
        path: '',
        component: PedidosComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: ':id',
        component: PedidosFormComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
    ],
  },
  {
    path: 'rotas',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },

    children: [
      {
        path: '',
        component: RotasComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] },
      },
    ],
  },
];
