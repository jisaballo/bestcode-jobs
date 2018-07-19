import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider, User } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-edit-personal',
  templateUrl: 'edit-personal.html',
})
export class EditPersonalPage {

  user: User;
  setPop: boolean = true;

  constructor(public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
  }

  ionViewDidLeave() {
    if(this.setPop) {
      this.navCtrl.pop();
    }
  }
  
  backButtonClick() {
    this.setPop = false;
    this.navCtrl.pop();
  }

  saveProfile() {
    this.userService.UpdateProfile(this.user);
    this.setPop = false;
    this.navCtrl.pop();
  }
}
