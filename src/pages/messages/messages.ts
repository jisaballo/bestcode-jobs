import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageDetailPage } from '../message-detail/message-detail';
import { MessageServiceProvider, chatExt } from '../../providers/message-service/message-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  chats: chatExt[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private chatService: MessageServiceProvider, private userService: UserServiceProvider) {
  }

  ionViewWillEnter() {
    this.chats = []
    this.chatService.loadChat().then(response => {
      this.chats = response;
      console.log(this.chats);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  openConversation(chat: chatExt) {
    this.navCtrl.push(MessageDetailPage, {chat});
  }
 }
