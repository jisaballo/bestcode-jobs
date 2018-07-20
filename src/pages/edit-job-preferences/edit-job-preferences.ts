import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider, UserExt } from '../../providers/user-service/user-service';

/**
 * Generated class for the EditJobPreferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-job-preferences',
  templateUrl: 'edit-job-preferences.html',
})
export class EditJobPreferencesPage {

  user: UserExt;
  statusJob = ['Disponible','Abierto a oportunidades','Sin interes por el momento'];
  interested = ['Independiente','Tiempo completo','Tiempo parcial'];
  frecuencyPay = ['Horas','Semanal','Quincenal','Mensual'];

  setPop: boolean = true;

  constructor(private userService: UserServiceProvider , public navCtrl: NavController, public navParams: NavParams) {
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
