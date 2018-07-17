import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProjectServiceProvider, ProjectExt } from '../../providers/project-service/project-service';
import { NewProjectPage } from '../new-project/new-project';
import { UserServiceProvider, UserExt } from '../../providers/user-service/user-service';
import { DateServiceProvider } from '../../providers/date-service/date-service';
import { NotifyServiceProvider } from '../../providers/notify-service/notify-service';

@IonicPage()
@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html',
})
export class ProjectDetailPage {

  project: ProjectExt;
  user: UserExt;
  owner: boolean;
  canApply: boolean;

  constructor(public dateService: DateServiceProvider, public userService: UserServiceProvider, public projectService: ProjectServiceProvider, 
    public navCtrl: NavController, public navParams: NavParams, private notifyService: NotifyServiceProvider) {

    this.userService.getProfile().then(res => {
      this.user = res as UserExt;
    });

    this.project = this.navParams.get('project');
    this.canApply = true;
  }

  ionViewWillEnter() {

    this.owner = false;
    this.Load();
    if(this.project.userID == this.user.id) {
      this.owner = true;
    }
    else {
      this.owner = false;
    }

    //validar si puede aplicar por este empleo
    if(typeof this.project.userApplied != 'undefined') {
      this.project.userApplied.map(data => {
        if(data == this.user.id) {
          this.canApply = false;
        }
      });
    }
  }

  async Load() {
    //load timeElapsed
    this.project.timeElapsed = this.dateService.differenceTime(this.project.pubDate);
  }

  editProject(project) {
    delete this.project.timeElapsed;
    this.navCtrl.push(NewProjectPage, {project});
  }

  deleteProject() {
    this.projectService.deleteProjectByID(this.project.id)
    this.navCtrl.pop();
  }

  applyProject() {
    this.project.applied = this.project.applied + 1;

    if(typeof this.project.userApplied === 'undefined') {
      this.project.userApplied = [];
    }
    this.project.userApplied.push(this.user.id);
    this.projectService.addProject(this.project, false);

    this.notifyService.applyProject(this.project);
    this.canApply = false;
  }

}
