import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditPersonalPage } from '../edit-personal/edit-personal';
import { UserServiceProvider, User } from '../../providers/user-service/user-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { EditAboutmePage } from '../edit-aboutme/edit-aboutme';
import { EditExpertisePage } from '../edit-expertise/edit-expertise';
import { DateServiceProvider } from '../../providers/date-service/date-service';
import { EditSkillsPage } from '../edit-skills/edit-skills';
import { EditJobPreferencesPage } from '../edit-job-preferences/edit-job-preferences';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User;
  myUser: string;
  expertise: any;
  constructor(public dateService: DateServiceProvider , public authService: AuthServiceProvider, public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.expertise = [];
  }

  ionViewWillEnter() {
    this.Load();
  }
  async Load() {
    this.user = await this.userService.getProfile();
  }
  editPersonal(user: User) {
    this.navCtrl.push(EditPersonalPage, {user});
  }
  editAbout(user: User) {
    this.navCtrl.push(EditAboutmePage, {user});
  }
  editExpertise(user: User) {
    this.navCtrl.push(EditExpertisePage, {user});
  }
  editSkills(user: User) {
    this.navCtrl.push(EditSkillsPage, {user});
  }
  editJobPreferences(user: User) {
    this.navCtrl.push(EditJobPreferencesPage, {user});
    console.log(user);
  }
  fixExpertice(user: User) {
    this.expertise = user.experience.map(data => {
      //console.log(data);
      let position = data.position;
      let company = data.company;
      let monthStart = this.dateService.getMonthFromID(Number(data.monthStart)).substring(0,3);
      let yearStart = Number(data.yearStart);
      let monthEnd = this.dateService.getMonthFromID(Number(data.monthEnd)).substring(0,3);
      let yearEnd = Number(data.yearEnd);
      
      let years = Number(data.yearEnd) - Number(data.yearStart);
      let month: number;

      if(Number(data.monthStart) > Number(data.monthEnd)) {
        month = 12 - Number(data.monthStart) + Number(data.monthEnd);
        years--;
      }
      else {
        month = Number(data.monthEnd) - Number(data.monthStart);
      }
      let time;
      if(years == 0) {
        time = month + ' meses';
      }
      else {
        time = years + ' años y ' + month + ' meses';
      }

      return {position, company, monthStart, yearStart, monthEnd, yearEnd, time};
    })
  }
}
