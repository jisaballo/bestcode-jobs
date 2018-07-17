import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular/components/app/app';

import { ProfilePage } from '../profile/profile';
import { UserServiceProvider, UserExt } from '../../providers/user-service/user-service';
import { SupportPage } from '../support/support';
import { LoginPage } from '../login/login';
import { NotificationPage } from '../notification/notification';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  user: UserExt;
  urlImageProfile: string;
  notification: number;

  constructor(private app: App, public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.notification = 0;
  }
  ionViewWillEnter() {
    this.Load();
  }
  async Load () {
    //get data from user
    this.user = await this.userService.getProfile();
  }

  openNotification() {
    this.navCtrl.push(NotificationPage);
  }

  openProfile() {
    this.navCtrl.push(ProfilePage, this.user);
  }

  openSupport() {
    this.navCtrl.push(SupportPage);
  }

  logOut() {
    this.app.getRootNav().setRoot(LoginPage);
  }

  incrementBadgeCount() {
    this.notification = this.notification+1;
  }

  decrementBadgeCount() {
    this.notification = this.notification-1;
  }

  deleteBadgeCount() {
    this.notification = 0;
  }
}
