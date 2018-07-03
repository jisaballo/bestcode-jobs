import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider, User } from '../../providers/user-service/user-service';
import { NotifyServiceProvider, Notify } from '../../providers/notify-service/notify-service';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  notification: Notify[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserServiceProvider, 
  private notifyService: NotifyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  ionViewWillEnter() {
    this.notifyService.getNotification().then(res => {
      this.notification = res;
    });
  }
}
