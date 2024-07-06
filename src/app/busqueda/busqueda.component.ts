import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {
  termino:string="";
  listaMostrada:any[]=[];
  listaEncontrada:any[]=[];
  paginacion:any[]=[];
  paginaActual:number=0;
  constructor(private router:Router,private activatedRoute: ActivatedRoute, private data:DataService) {
  }
  
  ngOnInit(){
    this.activatedRoute.params.forEach((params:Params)=>{
        this.termino =params['termino'];
        this.cargarLista()
    });
  }
  paginar(i:number){
      if(i*10+9<this.listaEncontrada.length)this.listaMostrada=this.listaEncontrada.slice(i,i+1)
      else this.listaMostrada=this.listaEncontrada.slice(i,i+1)
      this.paginaActual=i
  }
  paginarTexto(id:string){
    if(id.match("last")){
      this.listaMostrada=this.listaEncontrada.slice(this.paginacion.length-1)
      this.paginaActual=this.paginacion.length-1
    }
    if(id.match("first")) {
      if(this.listaEncontrada.length<1)this.listaMostrada=this.listaEncontrada.slice(0)
      else this.listaMostrada=this.listaEncontrada.slice(0,1)
      this.paginaActual=0
    }
  }
  verLibro(libroID:string){
    this.router.navigate(['libro/'+libroID])
  }
  cargarLista(){
    var lista: any[]=[];
    this.listaEncontrada=[]
    this.data.getLibros().subscribe((res: any)=>{
      lista=res;
      lista.forEach((libro: any) => {
        for (let key in libro) {
          if((libro[key]+"").toLowerCase().match(this.termino.toLowerCase())){
            this.listaEncontrada.push(libro)
            break;
          }
        };
      });
      this.paginar(0)
      this.paginacion=new Array(Math.floor(this.listaEncontrada.length / 1))
      
    })
  }
}
