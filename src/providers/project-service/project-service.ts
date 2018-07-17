import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UserExt, UserServiceProvider } from '../user-service/user-service';
import { DateServiceProvider } from '../date-service/date-service';

import { Project, ProjectFirebase } from '../../models/project';

export interface ProjectExt extends Project {
  id: string;
  timeElapsed: string;
  applied: number;
  ownerUrlImage: string;
  ownerName: string;
  ownerProfesion: string;
}

@Injectable()
export class ProjectServiceProvider {

  categoryCol: AngularFirestoreCollection<any>;

  projects: ProjectExt[];
  myProjects: ProjectExt[];

  categories: string[];
  subCategories: string[][];
  constructor(private projectFirebase: ProjectFirebase, private dateService: DateServiceProvider, private userService: UserServiceProvider, public afs: AngularFirestore, public http: HttpClient) {
  }

  async getCategories() {
    this.categories = [];
    this.subCategories = [];
    let count: number;
    count = 0;
    this.categoryCol = await this.afs.collection('catalog');
    await this.categoryCol.valueChanges().subscribe(res => {
      res.map(data => {
        this.categories.push(data.name);
        this.subCategories[count] = data.subcategories;
        count++;
      })
    })
    return this.categories;
  }

  getSubCategories(catergory: string) {
    let result: any;
    let count: number;
    count = 0;
    this.categories.forEach(element => {
      if(catergory == element) {
        result = this.subCategories[count];
      }
      count++;
    });
    return result;
  }

  async getProjectsWithID() {
    this.projects = [];
    await this.projectFirebase.getAllProject().subscribe(res => {
      res.map(a => {

        let data = a.payload.doc.data() as ProjectExt;
        data.id = a.payload.doc.id;

        if(typeof data.userApplied != 'undefined') {
          data.applied = data.userApplied.length;
        }
        else {
          data.applied = 0;
        }

        data.timeElapsed = this.dateService.differenceTime(data.pubDate);

        //add user reference for project
        this.userService.getProjectUser(data.userID).subscribe(res => {
          let user = res as UserExt;
          data.ownerName = user.username;
          data.ownerProfesion = user.profesion;
          data.ownerUrlImage = 'assets/imgs/default_profile.png'; //imagen por defecto
          if(typeof user.urlImage != 'undefined' && user.urlImage != '') {
            this.userService.getUrlImage(user.urlImage).subscribe(res => {
              data.ownerUrlImage = res;
            });
          }
        });

        this.projects.push(data);
      })
    });
    
    //console.log(this.projects);
    return this.projects;
  }

  getProjectByID(ID: string) {
    this.projectFirebase.getProjectByID(ID);
  }

  addProject(project: ProjectExt, ifNew: boolean) {
    if(ifNew) {
      this.projectFirebase.createProject(project);
    }
    else {
      this.projectFirebase.updateProject(project);
    }
  }

  async getProjectsByUser(user: string) {
    this.myProjects = [];
    await this.projectFirebase.getProjectByUser(user).subscribe(res => {
      res.map(a => {

        let data = a.payload.doc.data() as ProjectExt;
        data.id = a.payload.doc.id;
        data.timeElapsed = this.dateService.differenceTime(data.pubDate);
        
        this.myProjects.push(data);
      })
    })
    return this.myProjects;
  }

  deleteProjectByID(ID: string) {
    this.projectFirebase.deleteProject(ID);
  }
}
