import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

export interface chat {
    title: string;
    lastMessage: string;
    timestamp: number;
    userID: string;
    memberID: string;
}

export interface message {
    userName: string;
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

    async addChat(chat: chat, message: message) {
        try {
            let new_chatID = this.afs.createId();
            this.chatsCol.doc(new_chatID).set({chats: chat}).then(() => {
                this.addMessage(new_chatID, message);
            });
            return new_chatID;
        }
        catch(e) {
            console.error(e);
        }
    }

    async findChatByUser(userID: string, memberID: string) {
        return await this.afs.collection('chats', ref => ref.where('member', '==' , memberID)
        .where('userID', '==', userID)).snapshotChanges();
    }

    async updateChat() {

    }

    async addMessage(messageID: string, message: message) {
        let messages: message[] = [];
        try {
            await this.messagesCol.doc(messageID).valueChanges().subscribe(response => {
                messages = response['messages'] as message[];
            })

            messages.push(message);
            await this.updateMessages(messageID, messages);
        }
        catch(e) {
            console.error(e);
        }
    }

    async updateMessages(messageID: string, messages: message[]) {
        this.messagesCol.doc(messageID).set({messages: messages});
    }

    getMessages(messageID: string) {
        return this.messagesCol.doc(messageID).valueChanges();
    }
}

