import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatFirebase, chat, message } from '../../models/chat';
import { UserServiceProvider, UserExt } from '../user-service/user-service';

export interface chatExt extends chat {
  id: string;
  contactName: string;
  uriImagen: string;
}

export interface messageExt extends message {

}

@Injectable()
export class MessageServiceProvider {

  chats: chatExt[] = [];
  ID: string[] = [];

  constructor(public http: HttpClient, private chatFirebase: ChatFirebase, private userService: UserServiceProvider) {
    console.log('Hello MessageServiceProvider Provider');
  }

  async loadChat() {
    this.chats = [];

    await this.userService.getProfile().then(user => {
      this.ID = user.chats;
      this.ID.map(id => {
        this.chatFirebase.getChat(id).subscribe(res => {
          if(typeof res != 'undefined') {
            let chat = res as chatExt;
            chat.id = id;
            //nameuser
            this.userService.getUser(chat.memberID).subscribe(res => {
              let user = res.payload.data() as UserExt
              chat.contactName = user.username;
              
              chat.uriImagen = 'assets/imgs/default_profile.png'; //imagen por defecto
              if(typeof user.urlImage != 'undefined' && user.urlImage != '') {
                this.userService.getUrlImage(user.urlImage).subscribe(res => {
                  chat.uriImagen = res;
                });
              }
            });
            this.chats.push(chat);
          }
          else {
            //delete id from user
          }
        })
      })
    });
    return this.chats;
  }

  addMessage(chatID: string, userSend: UserExt, userReceived: UserExt, text: string) {
    if(chatID == '') {
      let new_chat: chat = { title: '', lastMessage: text, timestamp: new Date().getTime(), userID: userSend.id, memberID: userReceived.id };
      let new_message: messageExt = { userName: userSend.id, message: text, timestamp: new Date().getTime() };

      this.chatFirebase.addChat(new_chat, new_message).then(chatID => {
        //add chat al profile
        if(typeof userSend.chats == 'undefined') {
          userSend.chats = []
        }
        userSend.chats.push(chatID);
        this.userService.UpdateProfile(userSend);

        //add chat al usuario que se envia el mensaje
        if(typeof userReceived.chats == 'undefined') {
          userReceived.chats = []
        }
        userReceived.chats.push(chatID);
        this.userService.UpdateUser(userReceived);
      });
    }
    else {
      //add to old chat
    }
  }

  async getMessages(messageID: string) {
    let messages: messageExt[] = []
    await this.chatFirebase.getMessages(messageID).subscribe(res => {
      if(typeof res != 'undefined') {
        res['messages'].map(element => {
          messages.push(element);
        })
      }
    })
    return messages;
  }

  findChatByUser(userID: string, memberID: string) {
    return this.chatFirebase.findChatByUser(userID, memberID);
  }

}
