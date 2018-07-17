import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../providers/user-service/user-service';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  tabsHideOnSubPages: boolean;
  constructor(private authService: AuthServiceProvider, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {

    //se debe guardar y leer del storage
    this.user.email = 'jisaballo@outlook.com';
    this.user.password = 'lolo1986';
    this.login(this.user);
    //this.navCtrl.setRoot(TabsPage);
    
  }

  async login(user: User) {
    
    let result = await this.authService.login(user.email, user.password);
    if(result[0]== 'OK') {
      this.navCtrl.push(TabsPage);
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
