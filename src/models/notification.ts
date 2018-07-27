import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

export interface Notify {
    text: string;
    state: boolean;
    timestamp: number;
  }

@Injectable()
export class NotificationFirebase {

    notifyCol: AngularFirestoreCollection<any>;
    notifyDoc: AngularFirestoreDocument<any>;

    constructor(public afs: AngularFirestore) {
        this.notifyCol = this.afs.collection('notification');
    }

    async addNotification(userID : string, new_owner_project_notify: Notify) {
        let notification: Notify[] = [];
        await this.notifyCol.doc(userID).valueChanges().subscribe(res => {
            notification = res['notify'] as Notify[];
        })
        
        notification.push(new_owner_project_notify);
        await this.notifyCol.doc(userID).update({notify: notification});

    }

    async getAllOwnNotification(userID: string) {
        this.notifyDoc = this.notifyCol.doc(userID);
        await this.notifyDoc.valueChanges().subscribe(res => {
            if(typeof res == 'undefined') {
                this.notifyDoc.set({ notify: []});
            }
        });
        return this.notifyDoc.valueChanges();
    }

    updateNotification(notification: Notify[]) {
        this.notifyDoc.update({ notify: notification });
    }
}