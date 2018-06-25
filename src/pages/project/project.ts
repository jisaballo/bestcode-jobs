import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';

import { NewProjectPage } from '../new-project/new-project';
import { ProjectDetailPage } from '../project-detail/project-detail';
import { ProjectServiceProvider, Project } from '../../providers/project-service/project-service';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {

  
  projects: Project[];
  user: string;

  constructor(public authService: AuthServiceProvider, public projectService: ProjectServiceProvider, public navCtrl: NavController) {
    this.projects = [];
    this.user = authService.getMyUser();
  }

  ionViewWillEnter() {
    this.LoadProject();
  }

  async LoadProject() {
    this.projects = await this.projectService.getProjectsByUser(this.user);
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
