import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectServiceProvider, Project } from '../../providers/project-service/project-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-new-project',
  templateUrl: 'new-project.html',
})
export class NewProjectPage {

  project = {} as Project;
  projects : any;
  user: string;
  categories: string[];
  subCategories: string[];
  category: string;
  indexCategory: number;

  constructor(public authService: AuthServiceProvider, public projectService: ProjectServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.user = authService.getMyUser();
  }

  ionViewWillEnter() {
    this.Load();
  }

  async Load() {
    this.categories = await this.projectService.getCategories();
  }
  createProject() {
    this.project.userID = this.user;
    this.project.applied = 0;
    this.projectService.addProject(this.project);
    this.navCtrl.pop();
  }

  onChange(category: string) {
    console.log('Hola:' + category);
    this.subCategories = this.projectService.getSubCategories(category);
    console.log(this.subCategories);
  }

  closePage() {
    this.navCtrl.pop();
  }
}
