import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProjectServiceProvider, Project } from '../../providers/project-service/project-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NewProjectPage } from '../new-project/new-project';
import { User, UserServiceProvider } from '../../providers/user-service/user-service';
import { Observable } from '@firebase/util/dist/src/subscribe';

@IonicPage()
@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html',
})
export class ProjectDetailPage {

  project: Project;
  projectUser: User[];
  user: string;
  owner: boolean;
  constructor(public userService: UserServiceProvider, public authService: AuthServiceProvider, public projectService: ProjectServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.user = authService.getMyUser();
    this.project = this.navParams.get('project');
  }

  ionViewWillEnter() {

    this.owner = false;
    this.Load();
    if(this.project.userID == this.user) {
      this.owner = true;
    }
    else {
      this.owner = false;
    }
  }

  async Load() {
    this.projectUser = await this.userService.getProjectUser(this.project.userID);
  }

  editProject(project) {
    //this.navCtrl.push(NewProjectPage, {project});
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
    this.project.userApplied.push(this.user)
    this.projectService.applyProject(this.project);
  }

}
