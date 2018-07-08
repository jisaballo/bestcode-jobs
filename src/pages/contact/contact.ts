import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserExt } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  userDetail: UserExt;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userDetail = this.navParams.get('user');
    if(this.userDetail.experience.length == 0) {
      this.userDetail.experience = null;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  closePage() {
    this.navCtrl.pop();
  }
}
