import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Project } from '../project-service/project-service';
import { UserServiceProvider, User } from '../user-service/user-service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

export interface Notify {
  text: string;
  state: boolean;
  timestamp: number;
}

interface MyNotify {
  notification: Notify[];
}

@Injectable()
export class NotifyServiceProvider {

  notifyCol: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private userService: UserServiceProvider, public http: HttpClient) {
    console.log('Hello NotifyServiceProvider Provider');
  }

  async getNotification() {
    let result: Notify[];
    result = [];
    this.notifyCol = await this.afs.collection('notification');

    await this.userService.getProfile().then(res => {
      let user = res as User;
      this.notifyCol.doc(user.id).valueChanges().subscribe(res => {
        res['notify'].map(data => {
          let notificacion = data as Notify;
          result.push(notificacion);
        })
      })
    })
    return result;
  }

  applyProject(project: Project) {
    let new_notify: Notify;
    new_notify = {
      text: 'Aplicate al proyecto ' + project.name,
      state: true,
      timestamp: new Date().getTime()
    };

    this.notifyCol = this.afs.collection('notification');

    this.userService.getProfile().then(res => {
      let user = res as User;
      this.notifyCol.doc(user.id).valueChanges().subscribe(res => {
        if(typeof res == 'undefined') {
          this.notifyCol.doc(user.id).set({
            notify: [new_notify]
          })
        }
        else {
          let notification = res['notify'];
          console.log(notification);

          this.notifyCol.doc(user.id).update({
            notify: [new_notify]
          })
        }
      });
    })
  }
}
