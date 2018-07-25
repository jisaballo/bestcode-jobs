import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

export interface Log {
    timestanp: number;
    type: string;
    text: string;
}

@Injectable()
export class LogsFirebase {

    logsCol: AngularFirestoreCollection<any>;
    logsDoc: AngularFirestoreDocument<any>;

    logsGeneralDoc: AngularFirestoreDocument<any>;

    constructor(private afs: AngularFirestore) {
        this.logsCol = this.afs.collection('logs');
    }

    loadLogs(userID) {
        this.logsDoc = this.logsCol.doc(userID);
        return this.logsDoc.valueChanges();
    }

    createDocument() {
        this.logsDoc.set({
            logs: []
        });
    }

    updateLogs(logs: Log[]) {
        console.log('update');
        this.logsDoc.update({ logs: logs });
    }

    addToAuth(log: Log) {
        this.afs.collection('logs_auth').add({
            timestanp: new Date().getTime(),
            type: log.type,
            text: log.text
        });
    }
    

}