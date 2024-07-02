import { Component, inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public nombre:string="";
  public apellidos:string="";
  public dni:string="";
  public direccion:string="";
  public cp:string="";
  public telefono:string="";
  public user:string="";
  public pass:string="";
  public mensaje:string[]=["El DNI no es valido, debe incluir la letra","El código postal no es valido", "El teléfono no es valido", "El e-mail no es valido","La contraseña debe de tener un mínimo de 6 caracteres"];
  public valido:boolean[]=[false,false,false,false,false];
  public mapaDni:string[]=["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"]
  private authService = inject(AuthService);


  constructor(private router:Router, private data:DataService) {
    if(this.authService.obtenerCookieInicio()!=="")this.router.navigate(['']);
  }
  validarFormulario(){
    if(this.mapaDni[parseInt(this.dni.substring(0,8))%23]!=this.dni.substring(8).toUpperCase()){
      this.valido[0]=true;
    }else{
      this.valido[0]=false;
    }
    if(isNaN(parseInt(this.cp))){
      this.valido[1]=true;
    }else if( parseInt(this.cp)<10000 || parseInt(this.cp)>99999){
      this.valido[1]=true;
    }else{
      this.valido[1]=false;
    }
    if(isNaN(parseInt(this.telefono))){
      this.valido[2]=true;
    }else if(parseInt(this.telefono)<100000000 || parseInt(this.telefono)>999999999){
      this.valido[2]=true;
    }else{
      this.valido[2]=false;
    }
    if(!this.user.match("[a-zA-ZñÑ]+@[a-zA-ZñÑ]+.[a-zA-ZñÑ]{2,3}")){
      this.valido[3]=true;
    }else{
      this.valido[3]=false;
    }
    if(this.pass.length<6){
      this.valido[4]=true;
    }else{
      this.valido[4]=false;
    }
  }
  async crearUsuario(){
    this.validarFormulario();
    for (var i = 0, len = this.valido.length; i < len; i++) {
      if (this.valido[i]) {
        return; 
      }
    }
    try {
      var uid=await this.authService.crearUsuario(this.user,this.pass)
      this.data.crearDatosUsuario(this.nombre, this.apellidos,this.dni,this.direccion,this.cp,this.telefono,this.user,uid)
      this.router.navigate([''])
    } catch (error) {}
    
  }
}
