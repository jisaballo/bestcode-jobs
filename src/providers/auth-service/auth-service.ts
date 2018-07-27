import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '@firebase/auth-types';
import { LogsServiceProvider } from '../logs-service/logs-service';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthServiceProvider {

  logged: boolean = false;

  currentUser: User;
  userEmail: string;
  public state: boolean = false;

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore, public http: HttpClient, 
    private logsService: LogsServiceProvider, private storage: Storage) {
    console.log('Hello AuthServiceProvider Provider');
    this.logged = false;
    this.userEmail = '';
  }

  //register
  async register(email: string, password: string) {
    try {
      this.userEmail = email;
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      if(result) {
        this.saveCredentials(email,password);
        this.currentUser = await this.afAuth.auth.currentUser;
        this.currentUser.sendEmailVerification();
        this.logged = true;
        return result;
      }
    }
    catch(e) {
      console.error(e);
      return e;
    }
  }

  async deleteUser() {
    return this.currentUser.delete().then(res => {
      return res;
    })
  }

  autoLogin(){
    return this.storage.get('email').then((email) => {
      if(email) {
        return this.storage.get('password').then((password) => {
          if(password) {
            return this.login(email,password).then(res => {
              return res;
            });
          }
        });
      }
      else {
        return null;
      }
    });
  }

  // Login a user
  // Normally make a server request and store
  // e.g. the auth token
  async login(email: string, password: string) {
    let result: string[] = [];
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
        this.saveCredentials(email, password);
        result.push('OK');
        result.push('Succes');
        this.logged = true;
        this.currentUser = this.afAuth.auth.currentUser;
        this.userEmail = email;
      });
    }
    catch(e) {
      console.log(e);
      result.push(e.code);
      if(e.code == 'auth/invalid-email') {
        result.push('Dirección de correo incorrecta');
      }
      else if(e.code == 'auth/user-not-found' || e.code == 'auth/wrong-password') {
        result.push('Usuario o contraseña incorrecto');
      }
      else {
        result.push(e.message);
      }
    }
    return result;
  }
 
  // Logout a user, destroy token and remove
  // every information related to a user
  async logout() {
    try {
      this.afAuth.auth.signOut().then(res => {
        console.log(res);
        this.logged = false;
        this.storage.remove('email');
        this.storage.remove('password');
      })
      .catch();
    }
    catch(e) {
      console.error(e);
    }
  }
 
  // Returns whether the user is currently authenticated
  // Could check if current token is still valid
  authenticated() {
    return this.logged;
  }

  getUserEmail() {
    return this.userEmail;
  }

  getCredentials(uID: string) {
    return this.afStore.collection('credentials', ref => ref.where('token','==', uID)).snapshotChanges();
  }

  saveCredentials(correo: string, contrasena: string) {
    this.storage.get('email').then((email) => {
      if(!email) {
        this.storage.set('email', correo);
        this.storage.get('password').then((password) => {
          if(!password) {
            this.storage.set('password', contrasena);
          }
        });
      }
    });
  }
}
