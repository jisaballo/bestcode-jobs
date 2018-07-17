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
        this.notifyCol = this.afs.collection('notification', ref => ref.orderBy('timestamp'));
    }

    getAllOwnNotification(userID: string) {
        this.notifyDoc = this.notifyCol.doc(userID);
        return this.notifyDoc.valueChanges();
    }

    updateNotification(notification: Notify[]) {
        this.notifyDoc.update({ notify: notification });
    }
}