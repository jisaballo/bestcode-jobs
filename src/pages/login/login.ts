import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserExt } from '../../providers/user-service/user-service';
import { AlertController } from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as UserExt;

  constructor(private uniqueDeviceID: UniqueDeviceID, private authService: AuthServiceProvider, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {
    
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
      });
    })
    .catch(error => {
      console.error(error);
      //for testing
      let uuid = '8a34a38a-3f37-6950-3556-120896651718';
      this.authService.getCredentials(uuid).subscribe(res => {
        res.map(element => {
          let credentials = element.payload.doc.data();
          this.user.email = credentials['username'];
          this.user.password = credentials['password'];
          this.login(this.user);
        })
      });
    });
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
