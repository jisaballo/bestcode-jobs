import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { UserServiceProvider, User, Experience, Skill } from '../../providers/user-service/user-service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'page-recruit',
  templateUrl: 'recruit.html'
})
export class RecruitPage {

  users: User[];
  filterUser: User[];
  constructor(public userService: UserServiceProvider , public navCtrl: NavController) {
  }
  ionViewWillEnter() {
    this.LoadUsers();
    console.log(this.filterUser);
  }
  async LoadUsers() {
    const result = await this.userService.getAllUser();
    this.users = result;
    this.filterUser = result;
  }

  getUsers(ev: any) {
    this.filterUser = this.users;
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.filterUser = this.filterUser.filter((item) => {
        return (item.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  avanceFilter() {
    console.log('hi');
  }
  onCancel() {
    console.log('lolo');
    this.filterUser = this.users;
  }
}
