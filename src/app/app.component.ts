import { Component, inject } from '@angular/core';
import { RouterOutlet,RouterModule,Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myweb';
  busqueda="";
  private authService = inject(AuthService);
  constructor(private router:Router) {}
  cerrarSesion(){
    this.authService.cerrarSesion();
  }
  buscar(){
    this.router.navigate(['busqueda/'+this.busqueda])
  }
}
