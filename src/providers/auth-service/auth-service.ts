import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '@firebase/auth-types';
import { LogsServiceProvider } from '../logs-service/logs-service';

@Injectable()
export class AuthServiceProvider {

  userCollection: AngularFirestoreCollection<any>;
  logged: boolean;

  currentUser: User;
  userEmail: string;
  public state: boolean;

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore, public http: HttpClient, private logsService: LogsServiceProvider) {
    this.logged = false;
    this.state = false;
    this.userCollection = this.afStore.collection('users');
    this.userEmail = '';
  }

  //register
  async register(email: string, password: string) {
    try {
      this.userEmail = email;
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      if(result) {
        this.currentUser = await this.afAuth.auth.currentUser;
        this.currentUser.sendEmailVerification();
        this.logged = true;
        return result;
      }
    }
    catch(e) {
      let text = 'code: ' + e['code'] + ' message: ' + e['message'] + ' user: ' + email;
      this.logsService.addToAuth(text,'error');
      console.error(e);
      return e;
    }
  }

  // Login a user
  // Normally make a server request and store
  // e.g. the auth token
  async login(email, password) {
    let result: string[] = [];
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      result.push('OK');
      result.push('Succes');
      this.logged = true;
      this.userEmail = email;
    }
    catch(e) {
      let text = 'code: ' + e['code'] + ' message: ' + e['message'] + ' user: ' + email;
      this.logsService.addToAuth(text,'error');

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
    this.state = true;
    return result;
  }
 
  // Logout a user, destroy token and remove
  // every information related to a user
  async logout() {
    try {
      await this.afAuth.auth.signOut();
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
}
