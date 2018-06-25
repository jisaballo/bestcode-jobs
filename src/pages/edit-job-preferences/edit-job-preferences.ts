import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider, User } from '../../providers/user-service/user-service';

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

  user: User;
  statusJob = ['Disponible','Abierto a oportunidades','Sin interes por el momento'];
  interested = ['Independiente','Tiempo completo','Tiempo parcial'];
  frecuencyPay = ['Horas','Semanal','Quincenal','Mensual'];
  constructor(private userService: UserServiceProvider , public navCtrl: NavController, public navParams: NavParams) {
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
