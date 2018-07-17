import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

export interface Project {
    name: string;
    description: string;
    value: string;
    durationTime: string;
    pubDate: number;
    userID: string;
    category: string;
    subCategory: string;
    userApplied: Array<string>;
  }

  @Injectable()
  export class ProjectFirebase {

    projectsCol: AngularFirestoreCollection;

      constructor(public afs: AngularFirestore) {
        this.projectsCol = this.afs.collection('projects', ref => ref.orderBy('pubDate', "desc"));
      }

      convertProjects(project: any) {
        let firebase_project: Project;
        
        firebase_project = {
            name: project.name,
            description: project.description,
            value: project.value,
            durationTime: project.durationTime,
            pubDate: project.pubDate,
            userID: project.userID,
            category: project.category,
            subCategory: project.subCategory,
            userApplied: project.userApplied
        };
        return firebase_project;
      }

      getAllProject() {
        return this.projectsCol.snapshotChanges();
      }

      getProjectByUser(user: string) {
        let userProjects: AngularFirestoreCollection;
        return this.afs.collection('projects', ref => ref.where('userID','==', user)).snapshotChanges();
      }

      getProjectByID(id: string) {
        return this.projectsCol.doc(id).valueChanges();
      }

      createProject(parameter: any) {
        let project: Project = this.convertProjects(parameter);

        let pubDate = new Date().getTime();
        project.pubDate = pubDate;

        this.projectsCol.add(project);
      }

      updateProject(parameter: any) {
        let project: Project = this.convertProjects(parameter);

        this.projectsCol.doc(parameter.id).update(project);
      }

      deleteProject(id: string) {
        this.afs.collection("projects").doc(id).delete().then(function() {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
      }
  }