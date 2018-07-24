import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProjectServiceProvider, ProjectExt } from '../../providers/project-service/project-service';
import { ProjectPage } from '../project/project';
import { ProjectDetailPage } from '../project-detail/project-detail';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  message : string;

  projects: ProjectExt[];
  
  constructor(public projectService: ProjectServiceProvider, private authService: AuthServiceProvider, 
    public navCtrl: NavController) {
    this.message = 'Fail';
  }

  ionViewWillEnter() {
    if(this.authService.authenticated()) {
      this.LoadProjects();
    }
    else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  async LoadProjects() {
    this.projects = await this.projectService.getProjectsWithID();
  }

  projectDetail(project: ProjectExt) {
    this.navCtrl.push(ProjectDetailPage, {project});
  }

  openProjects() {
    this.navCtrl.push(ProjectPage);
  }

}
