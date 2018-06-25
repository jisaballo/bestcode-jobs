import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

export interface User {
  id: string;
  username: string;
  profesion: string;
  email: string;
  password: string;
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
export class UserServiceProvider {

  usersCollection: AngularFirestoreCollection;
  private users: User[];

  //own user
  private profileCollection: AngularFirestoreCollection;
  private profileDoc: AngularFirestoreDocument;
  private profile: User;

  constructor(public afs: AngularFirestore, public http: HttpClient) {
    
  }

  async LoadProfile(username: string) {
    let experience: Experience[];
    let skills: Skill[];
    this.profile =  {id: '', username: '', profesion: '', email: '', password: '', phone: '', country: '',
    jobAvailability: '', jobInterested: '', jobSalary: '', jobSalaryFrecuency: '', skills: skills, 
    experience: experience, about: ''};

    this.profileCollection = await this.afs.collection('users', ref => ref.where('email','==', username));
    await this.profileCollection.snapshotChanges().subscribe(res => {
      res.map(data => {
        this.profile = data.payload.doc.data() as User;
        this.profile.id = data.payload.doc.id;
        this.profileDoc = this.afs.collection('users').doc(this.profile.id);
      })
    });
  }
  async UpdateProfile(user: User) {
    await this.profileDoc.update(user);
  }

  async getProfile() {
    return this.profile;
  }

  async getProjectUser(username: string) {
    let auxCollection: AngularFirestoreCollection;
    let result: User[];
    result = [];
    auxCollection = await this.afs.collection('users', ref => ref.where('email','==', username));
    await auxCollection.valueChanges().subscribe(res => {
      res.map(data => {
        result.push(data as User);
      })
    });
    return result;
  }

  async getAllUser() {
    this.users = [];
    this.usersCollection = await this.afs.collection('users');
    await this.usersCollection.valueChanges().subscribe(data => {
      data.map(element => {
        let new_user: User;
        let experience: Experience[];
        let skills: Skill[];
        new_user = {id:'', username: '', profesion: '', email: '', password: '', phone: '', country: '', 
        jobAvailability: '', jobInterested: '', jobSalary: '', jobSalaryFrecuency: '', skills: skills, 
        experience: experience, about: ''};
        
        new_user.username = element.username;
        new_user.profesion = element.profesion;
        new_user.email = element.email;
        new_user.phone = element.phone;
        new_user.country = element.country;
        new_user.skills = element.skills;
        new_user.experience = element.experience;
        new_user.about = element.about;
        
        this.users.push(new_user);
      })
    })
    return this.users;
  }
}
