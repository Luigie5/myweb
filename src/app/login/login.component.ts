import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private filtro:any;
  constructor(private data:DataService) {
    this.data.getInventario().subscribe((res: any)=>{
      this.filtro=res;
      console.log(this.filtro);
    })
  }
}
