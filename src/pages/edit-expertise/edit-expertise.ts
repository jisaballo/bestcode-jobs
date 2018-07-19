import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User, Experience, UserServiceProvider } from '../../providers/user-service/user-service';
import { DateServiceProvider } from '../../providers/date-service/date-service';

@IonicPage()
@Component({
  selector: 'page-edit-expertise',
  templateUrl: 'edit-expertise.html',
})
export class EditExpertisePage {

  monthStart: string;
  monthEnd: string;
  yearStart: string;
  yearEnd: string
  years: any;
  months: any;
  position: string;
  company: string;
  user: User;
  expertise: any;

  setPop: boolean = true;

  constructor(public dateService: DateServiceProvider, public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
    this.months = dateService.getMonths();
    this.years = dateService.getYears();
    this.fixExpertice(this.user);
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
    let new_experience: Experience;
    new_experience = {position: '', company: '', monthStart: '', yearStart: '', monthEnd: '', yearEnd: ''};

    new_experience.position = this.position;
    new_experience.company = this.company;
    new_experience.monthStart = String(this.dateService.getMonthID(this.monthStart));
    new_experience.yearStart = this.yearStart;
    new_experience.monthEnd = String(this.dateService.getMonthID(this.monthEnd));
    new_experience.yearEnd = this.yearEnd;

    this.user.experience.push(new_experience);
    this.userService.UpdateProfile(this.user);

    this.setPop = false;
    this.navCtrl.pop();
  }

  deleteExpertise(id: number) {
    this.user.experience.splice(id, 1);
    this.userService.UpdateProfile(this.user);
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
