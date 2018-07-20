import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserExt, UserServiceProvider } from '../../providers/user-service/user-service';


@IonicPage()
@Component({
  selector: 'page-edit-aboutme',
  templateUrl: 'edit-aboutme.html',
})
export class EditAboutmePage {

  user: UserExt;
  setPop: boolean = true;

  constructor(private userService:UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
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
