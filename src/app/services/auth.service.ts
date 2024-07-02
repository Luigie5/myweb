import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  User,
  UserCredential,
  getIdToken
} from '@angular/fire/auth';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
  
@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private user:any;
    private auth: Auth = inject(Auth);
    readonly authState$ = authState(this.auth);
    private coki: CookieService = inject(CookieService);

    async crearUsuario(usuario:string, pass:string) {
        this.user=await(createUserWithEmailAndPassword(
        this.auth,
        usuario,
        pass
        ))
        sendEmailVerification(this.user.user);
        return this.user.user.uid;
    }

    async iniciarSesion(usuario:string, pass:string):Promise<UserCredential> {
        this.user=await(signInWithEmailAndPassword(
        this.auth,
        usuario,
        pass
        ))
        return this.user;
    }
    async almacenarCookieInicio(user: User){
        this.coki.set("User",await getIdToken(user), new Date(Date.now()+3600*1000))
    }
    eliminarCookieInicio(){
        this.coki.delete("User")
    }
    obtenerCookieInicio(){
        return this.coki.get("User")
    }
    cerrarSesion() {
        this.eliminarCookieInicio()
        return this.auth.signOut();
    }
    getUserIDCookieInicio(){
        return jwtDecode(this.obtenerCookieInicio()).sub
    }

}