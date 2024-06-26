import {Injectable} from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { Timestamp} from "firebase/firestore";

@Injectable({
    providedIn: 'root'
})

export class DataService{
    constructor(private firestore:Firestore){}
    getInventario(){
        const inventarioRef= collection(this.firestore, 'inventario');
        return collectionData(inventarioRef);
    }
    hacerPedido(nombre:String,cantidadPedida:number, cantidadActual:number, pedidor:String, comentario:String){
        const inventarioDocRef= doc(this.firestore, 'inventario/'+nombre);
        const pedidosDocRef= collection(this.firestore, 'pedidos');
        var pedido= {
            nombre: nombre,
            cantidad: cantidadPedida,
            pedidor: pedidor,
            fecha: Timestamp.now(),
            comentario: comentario
        };
        addDoc(pedidosDocRef, pedido);
        return updateDoc(inventarioDocRef,{cantidad: cantidadActual-cantidadPedida});
    }
    getObjeto(nombre: string){
        const inventarioDocRef= doc(this.firestore, 'inventario/'+nombre);
        return getDoc(inventarioDocRef);
    }
    updateObjeto(obj:any){
        const inventarioDocRef= doc(this.firestore, 'inventario/'+obj.nombre);
        return updateDoc(inventarioDocRef,obj);
    }
    añadirObjetos(nuevo:any){
        const inventarioDocRef = collection(this.firestore, 'inventario');
        return setDoc(doc(inventarioDocRef, nuevo.nombre), nuevo)
    }
    getPedidos(){
        const pedidosRef= collection(this.firestore, 'pedidos');
        return collectionData(pedidosRef);
    }
    getEntradas(){
        const pedidosRef= collection(this.firestore, 'entradas');
        return collectionData(pedidosRef);
    }
    añadirObjeto(nombre:String,cantidadPedida:number, cantidadActual:number){
        const inventarioDocRef= doc(this.firestore, 'inventario/'+nombre);
        return updateDoc(inventarioDocRef,{cantidad: cantidadActual+cantidadPedida});
    }
    crearEntrada(nombre:String,cantidadPedida:number, proveedor: string, precio: number){
        const pedidosDocRef= collection(this.firestore, 'entradas');
        var entrada= {
            nombre: nombre,
            cantidad: cantidadPedida,
            precio: precio*cantidadPedida,
            proveedor: proveedor,
            fecha: Timestamp.now(),
        };
        return addDoc(pedidosDocRef, entrada);
    }
    eliminarProducto(nombre: string){
        const inventarioDocRef= doc(this.firestore, 'inventario/'+nombre);
        return deleteDoc(inventarioDocRef);
    }
}