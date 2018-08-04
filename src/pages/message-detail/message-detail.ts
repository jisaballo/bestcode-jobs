import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserExt, UserServiceProvider } from '../../providers/user-service/user-service';
import { MessageServiceProvider, chatExt, messageExt } from '../../providers/message-service/message-service';

@IonicPage()
@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html',
})
export class MessageDetailPage {

  user: UserExt;
  contact: UserExt;
  newMessage: string;
  chat: chatExt;

  messages: messageExt[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserServiceProvider,
    private chatService: MessageServiceProvider) {
    this.contact = this.navParams.get('user');
    this.chat = this.navParams.get('chat');
    console.log(this.chat);

    this.userService.getProfile().then(res => {
      this.user = res as UserExt;
    });
  }

  ionViewWillEnter() {
    this.messages = [];
    this.chatService.getMessages(this.chat.id).then(res => {
      this.messages = res as messageExt[];
      console.log(this.messages);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailPage');
  }

  backButtonClick() {
    //this.setPop = false;
    this.navCtrl.pop();
  }

  addMessage() {
    console.log(this.newMessage);
    let new_message: messageExt = { userName: this.user.username, message: this.newMessage, timestamp: new Date().getTime() }
    this.messages.push(new_message);
    this.chatService.addMessage('', this.user, this.contact, this.newMessage);
    this.newMessage = '';
  }

}
