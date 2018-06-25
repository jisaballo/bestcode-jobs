import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider, User, Skill } from '../../providers/user-service/user-service';

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
  user: User;
  skills: Skill[];
  constructor(public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
    this.skills = this.user.skills;
  }
  saveSkill() {
    let new_skill: Skill;
    new_skill = {name: this.skillName, level: this.level};
    console.log(this.user);
    this.user.skills.push(new_skill);
    this.userService.UpdateProfile(this.user);
  }

}
