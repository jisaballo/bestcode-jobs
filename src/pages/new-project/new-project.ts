import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectServiceProvider, ProjectExt } from '../../providers/project-service/project-service';
import { UserExt, UserServiceProvider } from '../../providers/user-service/user-service';


@IonicPage()
@Component({
  selector: 'page-new-project',
  templateUrl: 'new-project.html',
})
export class NewProjectPage {

  project = {} as ProjectExt;
  projects : any;
  user: UserExt;
  categories: string[];
  subCategories: string[];
  category: string;
  subCategory: string;

  ifNew: boolean;
  saveButton: string;
  title: string;

  constructor(public userService: UserServiceProvider, public projectService: ProjectServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    
    userService.getProfile().then(res => {
      this.user = res;
    });

    this.project = this.navParams.get('project');
    if(typeof this.project == 'undefined') {
      this.ifNew = true;
      this.saveButton = 'Crear';
      this.title = 'Nuevo empleo';
      this.project = {id: '', name: '', timeElapsed: '', applied: 0, ownerUrlImage: '', description: '', value: '', durationTime: '', pubDate: 0, userID: ''
      ,category: '', subCategory: '', userApplied: [], ownerName: '', ownerProfesion: ''};
    }
    else {
      this.ifNew = false;
      this.saveButton = 'Actualizar';
      this.title = 'Actualizar empleo';
    }
  }

  ionViewWillEnter() {
    this.Load();
  }

  async Load() {
    this.projectService.getCategories().then(res => {
      this.categories = res;
      if(!this.ifNew) {
        this.subCategories = [];
        this.category = this.project.category;
        this.subCategories.push(this.project.subCategory);
        this.subCategory = this.project.subCategory;
      }
    });
  }
  createProject() {
    this.project.userID = this.user.id;
    this.project.category = this.category;
    this.project.subCategory = this.subCategory;

    this.projectService.addProject(this.project, this.ifNew);
    this.navCtrl.pop();
  }

  onChange(category: string) {
    this.subCategories = this.projectService.getSubCategories(category);
  }

  closePage() {
    this.navCtrl.pop();
  }
}
