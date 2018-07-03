import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../user-service/user-service';
import { useAnimation } from '@angular/core/src/animation/dsl';
import { forEach } from '@firebase/util/dist/src/obj';
import { app } from 'firebase';
import { DateServiceProvider } from '../date-service/date-service';

export interface Project {
  id: string;
  name: string;
  description: string;
  value: string;
  durationTime: string;
  pubDate: number;
  userID: string;
  category: string;
  subCategory: string;
  applied: number;
  userApplied: Array<string>;
}

export interface ProjectExt extends Project {
  timeElapsed: string;
}

@Injectable()
export class ProjectServiceProvider {

  projectsCol: AngularFirestoreCollection<any>;
  categoryCol: AngularFirestoreCollection<any>;
  projectDoc: AngularFirestoreDocument<any>;

  projects: ProjectExt[];
  myProjects: ProjectExt[];

  categories: string[];
  subCategories: string[][];
  constructor(private dateService: DateServiceProvider, public afs: AngularFirestore, public http: HttpClient) {
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
    this.projectsCol = await this.afs.collection('projects');
    await this.projectsCol.snapshotChanges().subscribe(res => {
      res.map(a => {

        let data = a.payload.doc.data() as ProjectExt;
        data.id = a.payload.doc.id;
        data.timeElapsed = this.dateService.differenceTime(data.pubDate);
        
        this.projects.push(data);
      })
    })
    return this.projects;
  }

  getProjectByID(ID: string) {
    this.projectDoc = this.afs.doc('projects/' + ID);
    return this.projectDoc.valueChanges();
  }

  addProject(project: Project, ifNew: boolean) {
    if(ifNew) {
      //time pub
      let pubDate = new Date().getTime();
      project.pubDate = pubDate;

      this.projectsCol.add(project);
    }
    else {
      this.projectsCol.doc(project.id).update(project);
    }
  }

  async getProjectsByUser(user: String) {
    this.myProjects = [];
    this.projectsCol = await this.afs.collection('projects', ref => ref.where('userID','==', user));
    await this.projectsCol.snapshotChanges().subscribe(res => {
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
    this.afs.collection("projects").doc(ID).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }

  applyProject(project: Project) {
    this.afs.collection("projects").doc(project.id).update(project);
    
  }

}
