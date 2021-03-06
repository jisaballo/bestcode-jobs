import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProjectServiceProvider, ProjectExt } from '../../providers/project-service/project-service';
import { NewProjectPage } from '../new-project/new-project';
import { UserServiceProvider, UserExt } from '../../providers/user-service/user-service';
import { DateServiceProvider } from '../../providers/date-service/date-service';
import { FavoriteServiceProvider } from '../../providers/favorite-service/favorite-service';
import { ProfilePage } from '../profile/profile';
import { ContactPage } from '../contact/contact';

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
  setPop: boolean = true;
  //favorite control
  isFavorite: boolean = false;

  constructor(public dateService: DateServiceProvider, public userService: UserServiceProvider, public projectService: ProjectServiceProvider, 
    public navCtrl: NavController, public navParams: NavParams, private favoriteService: FavoriteServiceProvider) {

    this.userService.getProfile().then(res => {
      this.user = res as UserExt;
    });

    this.project = this.navParams.get('project');
    this.canApply = true;
  }

  ionViewWillEnter() {
    this.setPop = true;
    this.owner = false;
    this.project.timeElapsed = this.dateService.differenceTime(this.project.pubDate);
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

    //evaluar favorito
    this.favoriteService.getFavoriteProject().map(element => {
      console.log(element.id + ' ' + this.project.id);
      if(element.id == this.project.id) {
        this.isFavorite = true;
      }
    });
  }

  ionViewDidLeave() {
    if(this.setPop) {
      this.navCtrl.popToRoot();
    }
  }
  
  backButtonClick() {
    this.setPop = false;
    this.navCtrl.pop();
  }

  editProject(project) {
    this.setPop = false;
    delete this.project.timeElapsed;
    this.navCtrl.push(NewProjectPage, {project});
  }

  deleteProject() {
    this.projectService.deleteProjectByID(this.project.id)
    this.navCtrl.pop();
  }

  applyProject() {
    try {
      this.project.applied = this.project.applied + 1;

      if(typeof this.project.userApplied === 'undefined') {
        this.project.userApplied = [];
      }
      this.project.userApplied.push(this.user.id);
      this.projectService.addProject(this.project, false);
      this.canApply = false;
    }
    catch(e) {
      console.error(e);
    }
  }

  addFavorite() {
    if(this.isFavorite) { //eliminar proyecto de favoritos
      this.isFavorite = false;
      this.favoriteService.deleteProjectFavorite(this.project);
    }
    else { //agregar proyecto a favoritos
      this.isFavorite = true;
      this.favoriteService.addProjectFavorite(this.project);
    }
  }

  openProfile() {
    if(this.owner) {
      this.setPop = false;
      this.navCtrl.push(ProfilePage);
    }
    else {
      this.setPop = false;
      this.userService.getUser(this.project.userID).subscribe(res => {
        let user = res.payload.data() as UserExt;
        user.id = res.payload.id;

        user.uriImage = 'assets/imgs/default_profile.png'; //imagen por defecto
        if(typeof user.urlImage != 'undefined' && user.urlImage != '') {
          this.userService.getUrlImage(user.urlImage).subscribe(res => {
            user.uriImage = res;
          });
        }
        this.navCtrl.push(ContactPage, {user});
      });
    }
  }

}
