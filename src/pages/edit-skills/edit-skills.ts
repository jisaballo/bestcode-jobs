import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider, UserExt, SkillExt } from '../../providers/user-service/user-service';

/**
 * Generated class for the EditSkillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-skills',
  templateUrl: 'edit-skills.html',
})
export class EditSkillsPage {

  skillName: any;
  level: any;
  skillsLevel = ['Principiante','Intermedio','Experto'];
  user: UserExt;
  setPop: boolean = true;

  constructor(public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
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

  saveSkill() {
    let new_skill: SkillExt;
    new_skill = {name: this.skillName, level: this.level};
    this.user.skills.push(new_skill);
    this.userService.UpdateProfile(this.user);
  }

  deleteSkill(id: number) {
    this.user.skills.splice(id, 1);
    this.userService.UpdateProfile(this.user);
  }

}
