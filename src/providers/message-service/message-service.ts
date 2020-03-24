import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatFirebase, chat, message, members } from '../../models/chat';
import { UserServiceProvider, UserExt, ConversationExt } from '../user-service/user-service';
import { elementAttribute } from '@angular/core/src/render3/instructions';

export interface chatExt extends chat {
  id: string;
  contactID: string;
  contactName: string;
  uriImagen: string;
}

export interface messageExt extends message {

}

@Injectable()
export class MessageServiceProvider {

  chats: chatExt[] = [];

  constructor(public http: HttpClient, private chatFirebase: ChatFirebase, private userService: UserServiceProvider) {
    console.log('Hello MessageServiceProvider Provider');
  }

  async loadChat() {
    this.chats = [];

    await this.userService.getProfile().then(user => {
      user.chats.map(conversation => {
        this.chatFirebase.getChat(conversation.chatID).subscribe(res => {
          if(typeof res != 'undefined') {
            let chat = res as chatExt;
            chat.id = conversation.chatID;
            this.chatFirebase.GetMembers(chat.id).then(res => {
              res.subscribe(data => {
                let members_array = data as members;
                members_array.members.map(element => {
                  if(element != user.id) {
                    //contact
                    this.userService.getUser(element).subscribe(res => {
                      let user = res.payload.data() as UserExt
                      chat.contactID = res.payload.id;
                      chat.contactName = user.username;
                      
                      chat.uriImagen = 'assets/imgs/default_profile.png'; //imagen por defecto
                      if(typeof user.urlImage != 'undefined' && user.urlImage != '') {
                        this.userService.getUrlImage(user.urlImage).subscribe(res => {
                          chat.uriImagen = res;
                        });
                      }
                    });
                  }
                })
              })
            })
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

  async sendMessage(chat: chatExt, userSend: UserExt, userReceived: UserExt, messages: messageExt[]) {
    try {

      if(chat.id == '') {
        chat = {id: '', uriImagen: '', contactName: '', contactID: '', title: '', lastMessage: messages[0].message, timestamp: new Date().getTime() };

        let members: string[] = [userSend.id, userReceived.id];
        await this.chatFirebase.addChat(chat).then(chatID => {
          chat.id = chatID;
          //add members
          let new_members: members = {members: [userSend.id, userReceived.id]};
          this.chatFirebase.NewMembers(chatID , new_members);
          //user send
          this.chatFirebase.NewMessage().then(messageID => {
            this.chatFirebase.UpdateMessage(messageID, messages);
            
            if(typeof userSend.chats == 'undefined') {
              userSend.chats = []
            }
            let new_conversation: ConversationExt = { chatID: chatID, messageID: messageID};
            userSend.chats.push(new_conversation);
            this.userService.UpdateProfile(userSend);
          });

          //add received
          this.chatFirebase.NewMessage().then(messageID => {
            this.chatFirebase.UpdateMessage(messageID, messages);
  
            if(typeof userReceived.chats == 'undefined') {
              userReceived.chats = []
            }
            let new_conversation: ConversationExt = { chatID: chatID, messageID: messageID};
            userReceived.chats.push(new_conversation);
            this.userService.UpdateUser(userReceived);
          });
        });
      }
      else {
        //add to old chat
        userSend.chats.map(chat => {
          if(chat.chatID == chat.chatID) {
            this.chatFirebase.UpdateMessage(chat.messageID, messages);
          }
        })
        userReceived.chats.map(chat => {
          if(chat.chatID == chat.chatID) {
            this.chatFirebase.UpdateMessage(chat.messageID, messages);
          }
        })
      }
    }
    catch(e) {
      console.error(e);
    }
    return chat;
  }

  getMessages(messageID: string) {
    return this.chatFirebase.getMessages(messageID);
  }

  findChatByUser(userID: string, memberID: string) {
    return this.chatFirebase.findChatByUser(userID, memberID);
  }

}
