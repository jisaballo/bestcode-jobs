import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider, User } from '../../providers/user-service/user-service';
import { SupportPage } from '../support/support';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular/components/app/app';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  user: User;
  userID: string;
  urlImageProfile: string;

  constructor(private app: App,private authService: AuthServiceProvider, public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    
  }
  ionViewWillEnter() {
    this.Load();
  }
  async Load () {
    //get user id
    this.userID = await this.authService.getMyUser();
    //get data from user
    this.user = await this.userService.getProfile();
    if(this.user.urlImage != '') {
      this.userService.getUrlImage(this.user.urlImage).subscribe(res => {
        this.urlImageProfile = res;
      });
    }
    else {
      this.urlImageProfile = '';
    }
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
}
