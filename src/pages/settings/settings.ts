import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { UserServiceProvider, UserExt } from '../../providers/user-service/user-service';
import { SupportPage } from '../support/support';
import { LoginPage } from '../login/login';
import { NotificationPage } from '../notification/notification';
import { FavoritesPage } from '../favorites/favorites';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  user: UserExt;
  urlImageProfile: string;
  notification: number;

  constructor(public userService: UserServiceProvider, public navCtrl: NavController, 
    public navParams: NavParams, private authService: AuthServiceProvider) {
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

  openFavorites() {
    this.navCtrl.push(FavoritesPage);
  }

  openSupport() {
    this.navCtrl.push(SupportPage);
  }

  logOut() {
    this.authService.logout().then(res => {
      console.log(res);
      this.navCtrl.setRoot(LoginPage);
    });
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

  openPolicy() {
    var   features = "scrollbars=yes+,innerHeight=400+,innerWidth=800+,screenX=200+,screenY=400";
    window.open('https://bestcode-a6088.firebaseapp.com/', '_self', features);
  }
}
