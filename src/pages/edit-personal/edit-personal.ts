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
  constructor(public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
    console.log(this.user);
  }
  saveProfile() {
    console.log(this.user);
    this.userService.UpdateProfile(this.user);
    this.navCtrl.pop();
    console.log(this.user);
  }
}
