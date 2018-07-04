import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User, UserServiceProvider } from '../../providers/user-service/user-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProjectServiceProvider, Project } from '../../providers/project-service/project-service';
import { ProjectPage } from '../project/project';
import { ProjectDetailPage } from '../project-detail/project-detail';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular/components/app/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: User;
  message : string;
  username: string;

  projects: Project[];
  constructor(private userService: UserServiceProvider, public projectService: ProjectServiceProvider, 
    private authService: AuthServiceProvider, public navCtrl: NavController, private app: App) {
    this.message = 'Fail';

  }
  
  ionViewWillEnter() {
    if(this.authService.authenticated()) {
      this.username = this.authService.getMyUser();
      this.userService.LoadProfile(this.username);
      this.LoadProjects();
    }
    else {
      this.app.getRootNav().setRoot(LoginPage);
    }
  }

  async LoadProjects() {
    this.projects = await this.projectService.getProjectsWithID();
  }

  projectDetail(project: Project) {
    this.navCtrl.push(ProjectDetailPage, {project});
  }

  openProjects() {
    this.navCtrl.push(ProjectPage);
  }

}
