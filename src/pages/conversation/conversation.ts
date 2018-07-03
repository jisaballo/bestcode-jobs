import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagesServiceProvider, Chat } from '../../providers/messages-service/messages-service';

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {

  conversation: Chat[];
  constructor(private messageService: MessagesServiceProvider,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  ionViewWillEnter() {
    this.LoadChat();
  }

  async LoadChat() {
    this.conversation = await this.messageService.getConversation();
    console.log(this.conversation);
  }

}
