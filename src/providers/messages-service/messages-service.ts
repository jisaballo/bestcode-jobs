import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { UserServiceProvider, User } from '../user-service/user-service';

export interface Chat {
  members : string[];
  messages: Message[];
}
export interface Message {
  send: string;
  text: string;
  timestamp: number;
}

@Injectable()
export class MessagesServiceProvider {

  chatsCol: AngularFirestoreCollection<any>;
  membersCol: AngularFirestoreCollection<any>;
  messagesCol: AngularFirestoreCollection<any>;

  constructor(public afs: AngularFirestore, private userService: UserServiceProvider, public http: HttpClient) {
    console.log('Hello MessagesServiceProvider Provider');
  }

  async getConversation() {
    let result: Chat[];
    result = [];
    await this.userService.getProfile().then(res => {
      let profile = res as User;
      profile.idChat.map(id => {
        this.messagesCol = this.afs.collection('messages');
        this.messagesCol.doc(id).valueChanges().subscribe(data => {
          let aux = data as Chat;
          result.push(aux);
        })
      })
    });
    return result;
  }

  async newMessage(new_message: Message, to: string) {

    let new_chat: Chat;
    let miembros = [new_message.send, to];
    let mensajes = [];
    mensajes.push(new_message);
    new_chat = {members: miembros, messages: mensajes};

    this.messagesCol = await this.afs.collection('messages');
    let chatId = this.afs.createId();
    await this.messagesCol.doc(chatId).set(new_chat);
    this.userService.addIDChat(chatId);
  }

}
