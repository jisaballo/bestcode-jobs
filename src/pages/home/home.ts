import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserExt, UserServiceProvider } from '../../providers/user-service/user-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProjectServiceProvider, ProjectExt } from '../../providers/project-service/project-service';
import { ProjectPage } from '../project/project';
import { ProjectDetailPage } from '../project-detail/project-detail';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular/components/app/app';
import { NotifyServiceProvider } from '../../providers/notify-service/notify-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: UserExt;
  userEmail: string;
  message : string;

  projects: ProjectExt[];
  
  constructor(private userService: UserServiceProvider, public projectService: ProjectServiceProvider, 
    private authService: AuthServiceProvider, public navCtrl: NavController, private app: App, private notifyService: NotifyServiceProvider) {
    this.message = 'Fail';
    this.userEmail = this.authService.getUserEmail();
  }

  ionViewWillEnter() {
    if(this.authService.authenticated()) {
      
      this.userService.getUserID(this.userEmail).subscribe(res => {
        res.map(data => {
          let userID = data.payload.doc.id;
          
          this.userService.LoadProfile(userID);
          this.notifyService.loadNotification(userID);
          this.userService.loadAllUser();
        })
      });
      this.LoadProjects();
    }
    else {
      this.app.getRootNav().setRoot(LoginPage);
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
