import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../user-service/user-service';
import { useAnimation } from '@angular/core/src/animation/dsl';
import { forEach } from '@firebase/util/dist/src/obj';

export interface Project {
  id: string;
  name: string;
  description: string;
  value: string;
  durationTime: string;
  pubDate: string;
  userID: string;
  category: string;
  subcategory: string;
  applied: number;
}

@Injectable()
export class ProjectServiceProvider {

  projectsCol: AngularFirestoreCollection<any>;
  categoryCol: AngularFirestoreCollection<any>;
  projectDoc: AngularFirestoreDocument<any>;

  projects: Project[];
  myProjects: Project[];

  categories: string[];
  subCategories: string[][];
  constructor(public afs: AngularFirestore, public http: HttpClient) {
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

        let data = a.payload.doc.data() as Project;
        data.id = a.payload.doc.id;
        
        this.projects.push(data);
      })
    })
    return this.projects;
  }

  getProjectByID(ID: string) {
    this.projectDoc = this.afs.doc('projects/' + ID);
    return this.projectDoc.valueChanges();
  }

  addProject(project: Project) {
    this.projectsCol.add(project);
  }
  async getProjectsByUser(user: String) {
    this.myProjects = [];
    this.projectsCol = await this.afs.collection('projects', ref => ref.where('userID','==', user));
    await this.projectsCol.snapshotChanges().subscribe(res => {
      res.map(a => {

        let data = a.payload.doc.data() as Project;
        data.id = a.payload.doc.id;
        
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

}
