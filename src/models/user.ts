import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

export interface User {
    username: string;
    urlImage: string;
    profesion: string;
    email: string;
    phone: string;
    about: string;
    country: string;
    jobAvailability: string;
    jobInterested: string;
    jobSalary: string;
    jobSalaryFrecuency: string;
    experience: Array<Experience>;
    skills: Array<Skill>;
  }

  export interface Experience {
    position: string;
    company: string;
    monthStart: string;
    yearStart: string;
    monthEnd: string;
    yearEnd: string;
  }
  
  export interface Skill {
    name: string;
    level: string;
  }

  @Injectable()
  export class UserFirebase {

    usersCollection: AngularFirestoreCollection;
    private profileDoc: AngularFirestoreDocument;

    constructor(private afs: AngularFirestore) {
        this.usersCollection = this.afs.collection('users');
    }

    private convertUsers(parameter: any) {
        let firebase_user: User;

        firebase_user = {
            username: parameter.username,
            urlImage: parameter.urlImage,
            profesion: parameter.profesion,
            email: parameter.email,
            phone: parameter.phone,
            about: parameter.about,
            country: parameter.country,
            jobAvailability: parameter.jobAvailability,
            jobInterested: parameter.jobInterested,
            jobSalary: parameter.jobSalary,
            jobSalaryFrecuency: parameter.jobSalaryFrecuency,
            experience: parameter.experience,
            skills: parameter.skills
        }
        return firebase_user;
    }

    getUserID(email: string) {
        try {
            return this.afs.collection('users', ref => ref.where('email','==', email)).snapshotChanges();
        }
        catch(e) {
            console.error(e);
        }
    }

    addUser(parameter: any) {
        let user: User = this.convertUsers(parameter);

        this.usersCollection.add(user);
    }

    getProjectUser(userID: string) {
        return this.usersCollection.doc(userID).snapshotChanges();
    }

    loadAllUser() {
        return this.usersCollection.snapshotChanges();
    }

    LoadProfile(userID: string) {
        this.profileDoc = this.afs.collection('users').doc(userID);
        return this.profileDoc.valueChanges();
    }

    UpdateProfile(parameter: any) {
        console.log(parameter);
        let user: User = this.convertUsers(parameter);
        console.log(user);
        this.profileDoc.update(user);
    }
  }