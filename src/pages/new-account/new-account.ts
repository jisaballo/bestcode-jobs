import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { UserExt, UserServiceProvider } from '../../providers/user-service/user-service';
import { SplashPage } from '../splash/splash';

@IonicPage()
@Component({
  selector: 'page-new-account',
  templateUrl: 'new-account.html',
})
export class NewAccountPage {

  @ViewChild(Slides) slides: Slides;
  user: UserExt;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserServiceProvider) {
    this.user = this.navParams.get('new_user');
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewAccountPage');
  }

  goToSlide(index: number) {
    this.slides.slideTo(index, 500);
  }

  createUser() {
    this.userService.addUser(this.user);
    this.navCtrl.setRoot(SplashPage);
  }

}
