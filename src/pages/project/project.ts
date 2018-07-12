import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewProjectPage } from '../new-project/new-project';
import { ProjectDetailPage } from '../project-detail/project-detail';
import { ProjectServiceProvider, ProjectExt } from '../../providers/project-service/project-service';
import { SettingsPage } from '../settings/settings';
import { UserServiceProvider, UserExt } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {

  
  projects: ProjectExt[];
  user: UserExt;

  constructor(public userService: UserServiceProvider, public projectService: ProjectServiceProvider, public navCtrl: NavController) {
    this.projects = [];
    userService.getProfile().then(res => {
      this.user = res;
    })
  }

  ionViewWillEnter() {
    this.LoadProject();
  }

  async LoadProject() {
    this.projects = await this.projectService.getProjectsByUser(this.user.id);
  }

  newProject() {
    this.navCtrl.push(NewProjectPage);
  }

  projectDetail(project) {
    this.navCtrl.push(ProjectDetailPage, {project});
  }

  openSettings() {
    this.navCtrl.push(SettingsPage);
  }
}
