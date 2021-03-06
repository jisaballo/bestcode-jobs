import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserExt } from '../../providers/user-service/user-service';
import { NotifyServiceProvider, NotifyExt } from '../../providers/notify-service/notify-service';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  user: UserExt;
  notification: NotifyExt[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private notifyService: NotifyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  ionViewWillEnter() {
    this.notification = this.notifyService.getNotification();
  }

  ionViewDidLeave() {
    this.navCtrl.popToRoot();
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
    this.ionViewWillEnter();
  }
}
