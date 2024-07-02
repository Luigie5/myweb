import { Component, inject,} from '@angular/core';
import { FormsModule,} from '@angular/forms';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public user:string="";
  public pass:string="";
  public valido:boolean=false;
  public mensaje:string="El e-mail no es válido";
  private authService = inject(AuthService);
  
  constructor(private router:Router) {
    if(this.authService.obtenerCookieInicio()!=="")this.router.navigate(['']);
  }
  async iniciarSesion(){
    if(!this.user.match("[a-zA-ZñÑ1-9.-]+@[a-zA-ZñÑ]+.[a-zA-ZñÑ]{2,3}")){ 
      this.valido=true;
      this.mensaje="El e-mail no es valido"
      return
    }
    try {
      const verificado=await( this.authService.iniciarSesion(this.user, this.pass))
      console.log(verificado.user.emailVerified)
      console.log(verificado.user)
      if (!verificado.user.emailVerified){
        this.valido=true;
        this.mensaje="Debe de verificar el correo electrónico"
        return
      }
      this.authService.almacenarCookieInicio(verificado.user)
      this.router.navigate(['']);
      
    } catch (error) {
      this.valido=true;
      this.mensaje="El usuario o contraseña es erroneo"
    }
    
  }
}
