import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service.service';


@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.css'
})
export class HubComponent {
  constructor(private router: Router, private authService: AuthService) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout(): void{
    this.authService.logout();
  }
}
