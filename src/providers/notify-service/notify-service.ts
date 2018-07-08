import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Project } from '../project-service/project-service';
import { UserServiceProvider, User } from '../user-service/user-service';

export interface Notify {
  text: string;
  state: boolean;
  timestamp: number;
}

@Injectable()
export class NotifyServiceProvider {

  notifyCol: AngularFirestoreCollection<any>;
  notifyDoc: AngularFirestoreDocument<any>;

  notification: Notify[];

  constructor(private afs: AngularFirestore, private userService: UserServiceProvider, public http: HttpClient) {
    console.log('Hello NotifyServiceProvider Provider');

    this.notifyCol = this.afs.collection('notification', ref => ref.orderBy('timestamp'));
  }

  async loadNotification(userID: string) {
    this.notifyDoc = this.notifyCol.doc(userID);
    await this.notifyDoc.valueChanges().subscribe(res => {
      this.notification = [];
      if(typeof res != 'undefined') {
        res['notify'].map(data => {
          let event = data as Notify;
          this.notification.push(event);
        })
      }
      else {
        this.notifyDoc.set({
          notify: []
        });
      }
    });
    return this.notification;
  }

  getNotification() {
    return this.notification;
  }

  applyProject(project: Project) {
    let new_notify: Notify;
    new_notify = {
      text: 'Aplicaste al proyecto ' + project.name,
      state: true,
      timestamp: new Date().getTime()
    };

    this.notification.push(new_notify);
    this.UpdateNotificationDoc();
  }

  deleteNotification(index: number) {
    this.notification.splice(index,1);
    this.UpdateNotificationDoc();
  }

  deleteAllNotification() {
    this.notification = [];
    this.UpdateNotificationDoc();
  }

  async UpdateNotificationDoc() {
    this.notifyDoc.update({
      notify: this.notification
    });
  }
}
