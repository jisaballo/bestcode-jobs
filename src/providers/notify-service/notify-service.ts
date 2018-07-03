import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

export interface notify {
  text: string;
  state: boolean;
  timestamp: number;
}

@Injectable()
export class NotifyServiceProvider {

  notifyCol: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, public http: HttpClient) {
    console.log('Hello NotifyServiceProvider Provider');
  }

  applyProject(idProject: string, user: string) {
    let new_notify: notify;
    new_notify = { 
      text: 'El usuario ' + user + 'aplicó a tu proyecto', 
      state: true, 
      timestamp: new Date().getTime()
    };

    this.notifyCol = this.afs.collection('notification');
    this.notifyCol.add(new_notify);


  }
}
