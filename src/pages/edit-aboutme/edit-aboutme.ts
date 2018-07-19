import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User, UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the EditAboutmePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-aboutme',
  templateUrl: 'edit-aboutme.html',
})
export class EditAboutmePage {

  user: User;
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
