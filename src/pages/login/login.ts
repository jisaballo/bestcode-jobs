import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserExt, UserServiceProvider } from '../../providers/user-service/user-service';
import { AlertController } from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { App } from 'ionic-angular/components/app/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as UserExt;

  constructor(private uniqueDeviceID: UniqueDeviceID, private app: App, private authService: AuthServiceProvider, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {
    
  }

  ionViewWillEnter() {
    this.uniqueDeviceID.get().then(uuid => {
      this.authService.getCredentials(uuid).subscribe(res => {
        res.map(element => {
          let credentials = element.payload.doc.data();
          this.user.email = credentials['username'];
          this.user.password = credentials['password'];
          this.login(this.user);
        })
      })
    })
    .catch((error: any) => console.error(error));

  }
  async login(user: UserExt) {
    
    let result = await this.authService.login(user.email, user.password);
    if(result[0]== 'OK') {
      //this.navCtrl.push(TabsPage);
      this.app.getRootNav().setRoot(TabsPage);
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
