import {Injectable} from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

@Injectable({
    providedIn: 'root'
})

export class DataService{
    constructor(private firestore:Firestore){}
    getUsuarios(){
        const usuariosRef= collection(this.firestore, 'usuarios');
        return collectionData(usuariosRef);
    }
    crearDatosUsuario(nombre:string,apellidos:string,dni:string,direccion:string,cp:string, telefono:string, email:string, uid:string ){
        const usuariosRef= collection(this.firestore, 'usuarios');
        var usuario:any= {
            nombre: nombre,
            apellidos: apellidos,
            dni: dni,
            direccion: direccion,
            cp: cp,
            telefono: telefono,
            email: email,

        };
        setDoc(doc(usuariosRef, uid), usuario)
    }
    getDatosUsuario(uid: string){
        const inventarioDocRef= doc(this.firestore, 'usuarios/'+uid);
        return getDoc(inventarioDocRef);
    }
    updateDatosUsuario(user:any){
        const UsuarioDocRef= doc(this.firestore, 'usuarios/'+user.uid);
        return updateDoc(UsuarioDocRef,user);
    }
    eliminarDatosUsuario(uid: string){
        const usuarioDocRef= doc(this.firestore, 'usuarios/'+uid);
        return deleteDoc(usuarioDocRef);
    }
}