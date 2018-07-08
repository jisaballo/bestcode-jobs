import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { UserServiceProvider, User, Experience, Skill, UserExt } from '../../providers/user-service/user-service';
import { Observable } from 'rxjs/internal/Observable';
import { ContactPage } from '../contact/contact';

interface extUser extends User {
  uriImage: string;
}
@Component({
  selector: 'page-recruit',
  templateUrl: 'recruit.html'
})
export class RecruitPage {

  users: UserExt[];
  filterUser: UserExt[];
  constructor(public userService: UserServiceProvider , public navCtrl: NavController) {
  }
  ionViewWillEnter() {
    this.LoadUsers();
  }

  LoadUsers() {
    this.userService.getAllUser().then(res => {
      this.users = res;
      this.filterUser = res;
    });
  }

  getUsers(ev: any) {
    console.log('pepe');
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

  openContact(user: UserExt) {
    this.navCtrl.push(ContactPage, {user});
  }
}
