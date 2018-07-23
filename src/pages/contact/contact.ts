import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserExt } from '../../providers/user-service/user-service';
import { DateServiceProvider } from '../../providers/date-service/date-service';
import { FavoriteServiceProvider } from '../../providers/favorite-service/favorite-service';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  userDetail: UserExt;
  expertise: any;

  showExperience: boolean;
  showSkills: boolean;
  showSalary: boolean;
  setPop: boolean = true;

  isFavorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dateService: DateServiceProvider, private favoriteService: FavoriteServiceProvider) {
    this.userDetail = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  ionViewWillEnter() {
    this.setPop = true;
    //show salary section
    if(this.userDetail.jobAvailability == "" || this.userDetail.jobInterested == "" || this.userDetail.jobSalary || this.userDetail.jobSalaryFrecuency) {
      this.showSalary = false;
    }
    else {
      this.showSalary = true;
    }

    //show experiences section 
    if(this.userDetail.experience.length == 0) {
      this.showExperience = false;
    }
    else {
      this.fixExpertice(this.userDetail);
      this.showExperience = true;
    }

    //show skills section
    if(this.userDetail.skills.length == 0) {
      this.showSkills = false;
    }
    else {
      this.showSkills = true;
    }

    //evaluar favorito
    this.favoriteService.getFavoriteUsers().map(element => {
      console.log(element.id + ' ' + this.userDetail.id);
      if(element.id == this.userDetail.id) {
        this.isFavorite = true;
      }
    });
  }

  ionViewDidLeave() {
    if(this.setPop) {
      this.navCtrl.popToRoot();
    }
  }
  
  closePage() {
    this.setPop = false;
    this.navCtrl.pop();
  }

  fixExpertice(user: UserExt) {
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
    });
  }

  addFavorite() {
    if(this.isFavorite) { //eliminar proyecto de favoritos
      this.isFavorite = false;
      //this.favoriteService.deleteProjectFavorite(this.userDetail);
    }
    else { //agregar proyecto a favoritos
      this.isFavorite = true;
      this.favoriteService.addUserFavorite(this.userDetail);
    }
  }
}
