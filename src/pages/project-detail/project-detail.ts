import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProjectServiceProvider, Project, ProjectExt } from '../../providers/project-service/project-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NewProjectPage } from '../new-project/new-project';
import { User, UserServiceProvider } from '../../providers/user-service/user-service';
import { Observable } from '@firebase/util/dist/src/subscribe';
import { DateServiceProvider } from '../../providers/date-service/date-service';
import { MessagesServiceProvider, Message } from '../../providers/messages-service/messages-service';

@IonicPage()
@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html',
})
export class ProjectDetailPage {

  project: ProjectExt;
  projectUser: User;
  user: string;
  owner: boolean;
  canApply: boolean;
  urlImageProfile: string;

  constructor(private messageService: MessagesServiceProvider, public dateService: DateServiceProvider, public userService: UserServiceProvider, public authService: AuthServiceProvider, public projectService: ProjectServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.user = authService.getMyUser();
    this.project = this.navParams.get('project');
    this.canApply = true;
    //validar si puede aplicar por este empleo
    if(typeof this.project.userApplied != 'undefined') {
      console.log(this.project.userApplied);
      this.project.userApplied.map(data => {
        if(data == this.user) {
          this.canApply = false;
        }
      });
    }
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
    //load creator
    this.userService.getProjectUser(this.project.userID).then(even => {
      even.subscribe(res => {
        res.map(data => {
          this.projectUser = data as User;
          if(typeof this.projectUser.urlImage != 'undefined') {
            this.userService.getUrlImage(this.projectUser.urlImage).subscribe(res => {
              this.urlImageProfile = res;
            });
          }
          else {
            this.urlImageProfile = 'assets/imgs/default_profile.png';
          }
        })
      })
    });

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
    this.project.userApplied.push(this.user)
    this.projectService.applyProject(this.project);

    //send new message
    let new_message: Message;
    new_message = {send: this.user, text: 'Me gustaria aplicar por el proyecto tal', timestamp: 0}
    this.messageService.newMessage(new_message, this.projectUser.email);

    this.canApply = false;
  }

}
