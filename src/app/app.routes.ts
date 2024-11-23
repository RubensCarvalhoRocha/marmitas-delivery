import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { HubComponent } from './page/hub/hub.component';
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
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
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
