import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProjectExt } from '../project-service/project-service';
import { Notify, NotificationFirebase } from '../../models/notification';

export interface NotifyExt extends Notify {
}

@Injectable()
export class NotifyServiceProvider {

  notification: NotifyExt[];

  constructor(public http: HttpClient, private notifyFirebase: NotificationFirebase) {
    console.log('Hello NotifyServiceProvider Provider');
  }

  async loadNotification(userID: string) {
    await this.notifyFirebase.getAllOwnNotification(userID).then(res => {
      this.notification = [];
      if(typeof res != 'undefined') {
        if(typeof res['notify'] != 'undefined') {
          res['notify'].map(data => {
            let event = data as NotifyExt;
            this.notification.push(event);
          })
        }
        else {
          this.notifyFirebase.updateNotification([]);
        }
      }
      else {
        this.notifyFirebase.updateNotification([]);
      }
    });
    return this.notification;
  }

  getNotification() {
    return this.notification;
  }

  applyProject(project: ProjectExt) {

    let new_notify: NotifyExt;
    new_notify = {
      text: 'Aplicaste al proyecto ' + project.name,
      state: true,
      timestamp: new Date().getTime()
    };

    let new_owner_project_notify: NotifyExt;
    new_owner_project_notify = {
      text: 'Aplicaron por tu proyecto ' + project.name,
      state: true,
      timestamp: new Date().getTime()
    }
    this.notification.push(new_notify);

    //notificacion al creador del proyecto
    this.notifyFirebase.addNotification(project.userID, new_owner_project_notify);
    //notificacion al usuario
    this.notifyFirebase.updateNotification(this.notification);
  }

  deleteNotification(index: number) {
    this.notification.splice(index,1);
    this.notifyFirebase.updateNotification(this.notification);
  }

  deleteAllNotification() {
    console.log('delete all');
    this.notification = [];
    this.notifyFirebase.updateNotification(this.notification);
  }
}
