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
    console.log(this.userDetail);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

}
