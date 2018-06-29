import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Base64 } from '@ionic-native/base64';
import { Observable } from 'rxjs/internal/Observable';

export interface User {
  id: string;
  username: string;
  urlImage: string;
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

export interface UserExt extends User {
  uriImage: string;
}

@Injectable()
export class UserServiceProvider {

  task: AngularFireUploadTask;
  image: string;

  usersCollection: AngularFirestoreCollection;
  private users: UserExt[];

  //own user
  private profileCollection: AngularFirestoreCollection;
  private profileDoc: AngularFirestoreDocument;
  private profile: User;

  constructor(private base64: Base64, private afs: AngularFirestore, public http: HttpClient, private afStorage: AngularFireStorage) {
    
  }

  async LoadProfile(username: string) {
    let experience: Experience[];
    let skills: Skill[];
    this.profile =  {id: '', username: '', urlImage:'', profesion: '', email: '', password: '', phone: '', country: '',
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
  
  async addUser(user: User) {
    user.password = '';
    this.usersCollection = await this.afs.collection('users');

    this.usersCollection.add(user);
  }

  async getProjectUser(username: string) {
    let auxCollection: AngularFirestoreCollection;
    let result: User;
    auxCollection = await this.afs.collection('users', ref => ref.where('email','==', username));
    return await auxCollection.valueChanges();
  }

  getAllUser() {
    this.users = [];
    this.usersCollection = this.afs.collection('users');
    return this.usersCollection.valueChanges();
  }

  uploadImage(file: string) {
    
    let filePath = 'imgs/profile/' + new Date().getTime() +'.jpg';
    const storageRef: AngularFireStorageReference = this.afStorage.ref(filePath);

    if(this.profile.urlImage != '') {
      this.deletePreviousImage(this.profile.urlImage);
    }

    this.profile.urlImage = filePath;
    this.UpdateProfile(this.profile);

    return this.base64.encodeFile(file).then((base64File: string) => {
      return storageRef.putString(base64File, 'data_url');
    }, (err) => {
      console.log(err);
    });
  }

  getUrlImage(filePath) {
    try {
      const storageRef: AngularFireStorageReference = this.afStorage.ref(filePath);
      return storageRef.getDownloadURL();
    }
    catch (e){
      console.error(e);
    }
  }

  deletePreviousImage(filePath) {
    const storageRef: AngularFireStorageReference = this.afStorage.ref(filePath);
    storageRef.delete();
  }

}
