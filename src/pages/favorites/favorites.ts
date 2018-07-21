import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FavoriteServiceProvider, FavoriteExt } from '../../providers/favorite-service/favorite-service';
import { ProjectServiceProvider, ProjectExt } from '../../providers/project-service/project-service';
import { DateServiceProvider } from '../../providers/date-service/date-service';
import { UserServiceProvider, UserExt } from '../../providers/user-service/user-service';
import { ProjectDetailPage } from '../project-detail/project-detail';
import { ContactPage } from '../contact/contact';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favoritesProjects: FavoriteExt[];
  projects: ProjectExt[];

  favoritesUsers: FavoriteExt[];
  users: UserExt[];

  favoritesSegment: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private favoritesService: FavoriteServiceProvider, 
    private projectService: ProjectServiceProvider, private dateService: DateServiceProvider, private userService: UserServiceProvider) {
    this.favoritesSegment = 'projects';
  }

  ionViewWillEnter() {
    this.favoritesProjects = this.favoritesService.getFavoriteProject();
    this.favoritesUsers = this.favoritesService.getFavoriteUsers();
    this.LoadProjects();
    this.LoadUsers();
  }

  LoadProjects() {
    this.projects = [];
    try {
      this.favoritesProjects.map(element => {
        this.projectService.getProjectByID(element['id']).subscribe(res => {
          let project = res as ProjectExt;
          project.id = element['id'];
          project.timeElapsed = this.dateService.differenceTime(project.pubDate);
  
          //add user reference for project
          this.userService.getProjectUser(project.userID).subscribe(res => {
            let user = res.payload.data() as UserExt;
            user.id = res.payload.id;
            project.ownerName = user.username;
            project.ownerProfesion = user.profesion;
            project.ownerUrlImage = 'assets/imgs/default_profile.png'; //imagen por defecto
            if(typeof user.urlImage != 'undefined' && user.urlImage != '') {
              this.userService.getUrlImage(user.urlImage).subscribe(res => {
                project.ownerUrlImage = res;
              });
            }
          });
  
          this.projects.push(project);
        });
      });
    }
    catch(e) {
      console.error(e);
    }
  }

  LoadUsers() {
    this.users = [];
    this.favoritesUsers.map(element => {
      this.userService.getProjectUser(element['id']).subscribe(res => {
        let user = res.payload.data() as UserExt;
        user.id = res.payload.id;
        user.uriImage = 'assets/imgs/default_profile.png'; //imagen por defecto
        if(typeof user.urlImage != 'undefined' && user.urlImage != '') {
          this.userService.getUrlImage(user.urlImage).subscribe(res => {
            user.uriImage = res;
          });
        }
        this.users.push(user);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  projectDetail(project: ProjectExt) {
    this.navCtrl.push(ProjectDetailPage, {project});
  }

  closePage() {
    this.navCtrl.pop();
  }

  openContact(user: UserExt) {
    this.navCtrl.push(ContactPage, {user});
  }
}
