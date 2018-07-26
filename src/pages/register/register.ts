import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserExt, ExperienceExt, SkillExt, UserServiceProvider } from '../../providers/user-service/user-service';
import { TabsPage } from '../tabs/tabs';
import { TermsPage } from '../terms/terms';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: UserExt;
  experience: ExperienceExt[];
  skills: SkillExt[];
  alert: any;

  email: string;
  username: string;
  password: string;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(private authService: AuthServiceProvider, private userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.experience = [];
    this.skills =[];
    this.user = {id:'', username:'', uriImage: '', urlImage: '', profesion: '', email:'', password:'', phone: '', jobAvailability: '', jobInterested: '', jobSalary: '', jobSalaryFrecuency: '', about: '', country: '', experience: this.experience, skills: this.skills};
  }

  register() {
    try {
      this.user.email = this.email;
      this.user.password = this.password;
      if(this.username == '') {
        this.user.username = this.user.email.substring(0, this.user.email.lastIndexOf("@"));
      }
      else {
        this.user.username = this.username;
      }
      
      const result = this.authService.register(this.user.email, this.user.password);
      this.userService.addUser(this.user);
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
    this.navCtrl.push(LoginPage);
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

  hideShowPassword() {
    console.log('click');
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

}
