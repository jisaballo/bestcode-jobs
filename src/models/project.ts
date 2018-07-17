import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ProjectExt } from '../providers/project-service/project-service';

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
        this.projectsCol = this.afs.collection('projects');
      }

      convertProjects(project: ProjectExt) {
        let new_project: Project;
        
        new_project = {
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
        return new_project;
      }

      createProject(parameter: ProjectExt) {

      }

      updateProject(parameter: ProjectExt) {
        let project: Project = this.convertProjects(parameter);

        console.log(project);

        this.projectsCol.doc(parameter.id).update(project);
        
      }
  }