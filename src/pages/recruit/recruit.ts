import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { UserServiceProvider, User, Experience, Skill, UserExt } from '../../providers/user-service/user-service';
import { Observable } from 'rxjs/internal/Observable';

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
    this.userService.getAllUser().subscribe(res => {
      this.filterUser = [];
      res.map(element => {
        let new_user: UserExt = element as UserExt;
        
        if(typeof new_user.urlImage != 'undefined') {
          this.userService.getUrlImage(new_user.urlImage).subscribe(res => {
            new_user.uriImage = res;
          });
        }
        else {
          new_user.uriImage = 'assets/imgs/default_profile.png';
        }

        this.filterUser.push(new_user);
      })
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
}
