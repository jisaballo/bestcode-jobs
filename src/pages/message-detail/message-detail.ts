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
    this.chat = this.navParams.get('chat');
    this.contact = this.navParams.get('contact');
  }

  ionViewWillEnter() {
    this.LoadMessages();
    this.LoadContactUser();
  }

  LoadMessages() {
    this.messages = [];

    if(this.chat.id != '') {

      this.userService.getProfile().then(res => {
        this.user = res as UserExt;
  
        this.user.chats.map(chats => {
          if(chats.chatID == this.chat.id) {
            this.chatService.getMessages(chats.messageID).subscribe(res => {
              if(typeof res != 'undefined') {
                this.messages = res['messages'] as messageExt[];
              }
            });   
          }
        })
      });
    }
  }

  LoadContactUser() {
    this.userService.getUser(this.contact.id).subscribe(res => {
      this.contact = res.payload.data() as UserExt;
      this.contact.id = res.payload.id;

      if(typeof this.contact.urlImage != 'undefined' && this.contact.urlImage != '') {
        this.userService.getUrlImage(this.contact.urlImage).subscribe(res => {
          this.contact.uriImage = res;
        });
      }
      else {
        this.contact.uriImage = 'assets/imgs/default_profile.png';
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailPage');
  }

  backButtonClick() {
    //this.setPop = false;
    this.navCtrl.pop();
  }

  addMessage() {
    let new_message: messageExt = { userID: this.user.id, message: this.newMessage, timestamp: new Date().getTime() }
    this.messages.push(new_message);

    this.chatService.sendMessage(this.chat.id, this.user, this.contact, this.messages);

    this.newMessage = '';
  }

}
