import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

export interface chat {
    title: string;
    lastMessage: string;
    timestamp: number;
}

export interface members {
    members: string[];
}

export interface message {
    userID: string;
    message: string;
    timestamp: number;
}

@Injectable()
export class ChatFirebase {

    chatsCol: AngularFirestoreCollection<any>;
    membersCol: AngularFirestoreCollection<any>;
    messagesCol: AngularFirestoreCollection<any>;

    constructor(public afs: AngularFirestore) {
        this.chatsCol = this.afs.collection('chats');
        this.membersCol = this.afs.collection('members');
        this.messagesCol = this.afs.collection('messages');
    }

    getChat(chatID: string) {
        return this.chatsCol.doc(chatID).valueChanges();
    }

    async addChat(chat: chat) {
        try {
            let new_chatID = this.afs.createId();
            this.chatsCol.doc(new_chatID).set({chats: chat});
            
            return new_chatID;
        }
        catch(e) {
            console.error(e);
        }
    }

    async findChatByUser(userID: string, memberID: string) {
        return await this.afs.collection('chats', ref => ref.where('member1', '==' , memberID).where('userID', '==', userID)).snapshotChanges();
    }

    async updateChat() {

    }

    async NewMembers(chatID: string, members: members) {
        return await this.membersCol.doc(chatID).set(members);
    }

    async GetMembers(chatID: string) {
        return await this.membersCol.doc(chatID).valueChanges();
    }

    async NewMessage() {
        try {
            let new_messageID = this.afs.createId();
            this.messagesCol.doc(new_messageID).set({messages: []});
            
            return new_messageID;
        }
        catch(e) {
            console.error(e);
        }
    }

    async UpdateMessage(messageID: string, messages: message[]) {
        try {
            await this.messagesCol.doc(messageID).set({messages: messages});
        }
        catch(e) {
            console.error(e);
        }
    }

    getMessages(messageID: string) {
        return this.messagesCol.doc(messageID).valueChanges();
    }
}

