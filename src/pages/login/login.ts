import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserExt } from '../../providers/user-service/user-service';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as UserExt;

  constructor(private authService: AuthServiceProvider, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {
    
  }

  ionViewWillEnter() {
    
  }

  async login(user: UserExt) {
    
    let result = await this.authService.login(user.email, user.password);
    if(result[0]== 'OK') {
      this.navCtrl.setRoot(TabsPage);
    }
    else {
      this.showAlert(result[1]);
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  showAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
