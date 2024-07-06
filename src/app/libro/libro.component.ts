import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})

export class LibroComponent {
  tab:number=0;
  libroID:string="";
  libro:Libro=new Libro();
  constructor(private activatedRoute: ActivatedRoute, private data:DataService) {
    
  }
  
  ngOnInit(){
    this.activatedRoute.params.forEach((params:Params)=>{
      this.libroID =params['libroID'];
    });
    this.a()
  }
async a(){
  try {
    this.libro=await this.data.getLibro(this.libroID) as Libro
  } catch (error) {
    
  }
}

}
export class Libro{
  titulo:string="";
  autor:string="";
  isbn:string="";
}