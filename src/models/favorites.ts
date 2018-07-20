import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

export interface Favorite {
    id: string;
}

@Injectable()
export class FavoriteFirebase {

    favoriteCol: AngularFirestoreCollection<any>;
    favoriteDoc: AngularFirestoreDocument<any>;

    constructor(private afs: AngularFirestore) {
        this.favoriteCol = this.afs.collection('favorites');
    }

    loadFavorites(userID) {
        this.favoriteDoc = this.favoriteCol.doc(userID);
        return this.favoriteDoc.valueChanges();
    }

    createDocument() {
        this.favoriteDoc.set({
            project: [],
            user: []
        });
    }

    updateProject(favorites: Favorite[]) {
        this.favoriteDoc.update({ project: favorites });
    }

    updateUser(favorites: Favorite[]) {
        this.favoriteDoc.update({ user: favorites });
    }

}