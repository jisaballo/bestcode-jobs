import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User, Experience, Skill } from '../../providers/user-service/user-service';
import { TabsPage } from '../tabs/tabs';
import { TermsPage } from '../terms/terms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: User;
  experience: Experience[];
  skills: Skill[];
  alert: any;
  constructor(private authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    //this.experience = [{position: '', company: '', monthStart: '', yearStart: '', monthEnd: '', yearEnd: ''}];
    //this.skills = [{name:'',level:''}];
    this.experience = [];
    this.skills =[];
    this.user = {id:'', username:'', profesion: '', email:'', password:'', phone: '', about: '', country: '', experience: this.experience, skills: this.skills};
  }

  register(email: string, password: string) {
    try {
      this.user.email = email;
      this.user.password = password;
      this.user.username = this.user.email.substring(0, this.user.email.lastIndexOf("@"));

      const result = this.authService.register(this.user);
      result.then(a => {
        console.log(a);
        if(a.code == 'auth/email-already-in-use') {
          this.showAlert('Correo inválido', 'El correo que esta intentado utilizar ya esta en uso');
          this.alert.present();
        }
        else {
          this.navCtrl.setRoot(TabsPage);
        }
      })
    }
    catch(e) {
      console.error(e);
    }
  }

  login() {
    this.navCtrl.pop();
  }
  terms(){
    this.navCtrl.push(TermsPage);
  }
  showAlert(titile: string, message: string) {
    this.alert = this.alertCtrl.create({
      title: titile,
      subTitle: message,
      buttons: ['OK']
    });
  }

}
