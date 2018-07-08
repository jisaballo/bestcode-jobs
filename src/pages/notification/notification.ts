import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider, User } from '../../providers/user-service/user-service';
import { NotifyServiceProvider, Notify } from '../../providers/notify-service/notify-service';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  user: User;
  notification: Notify[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserServiceProvider, 
  private notifyService: NotifyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  ionViewWillEnter() {
    this.notification = this.notifyService.getNotification();
  }

  closePage() {
    this.navCtrl.pop();
  }

  deleteNotification(index: number) {
    this.notifyService.deleteNotification(index);
    this.ionViewWillEnter();
  }

  deleteAll() {
    this.notifyService.deleteAllNotification();
  }
}
