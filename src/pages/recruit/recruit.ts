import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider, User, UserExt } from '../../providers/user-service/user-service';
import { ContactPage } from '../contact/contact';

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
    this.users = this.userService.getAllUser();
    this.filterUser = this.users;
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
