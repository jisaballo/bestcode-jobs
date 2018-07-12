import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Base64 } from '@ionic-native/base64';
import { NotifyServiceProvider } from '../notify-service/notify-service';

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

  //all users
  usersCollection: AngularFirestoreCollection;
  users: UserExt[];

  //own user
  private profileCollection: AngularFirestoreCollection;
  private profileDoc: AngularFirestoreDocument;
  private profile: UserExt;
  private userID: string;

  constructor(private base64: Base64, private afs: AngularFirestore, public http: HttpClient, private afStorage: AngularFireStorage) {
    //all user collection
    this.usersCollection = this.afs.collection('users');
  }

  getUserID() {
    return this.afs.collection('users', ref => ref.where('email','==', 'josesaballo13@gmail.com')).snapshotChanges();
  }

  async LoadProfile(userID: string) {
    this.profileDoc = await this.afs.collection('users').doc(userID);
    await this.profileDoc.valueChanges().subscribe(res => {
      this.profile = res as UserExt;

      if(typeof this.profile.urlImage != 'undefined' && this.profile.urlImage != '') {
        this.getUrlImage(this.profile.urlImage).subscribe(res => {
          this.profile.uriImage = res;
        });
      }
      else {
        this.profile.uriImage = 'assets/imgs/default_profile.png';
      }

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
    this.usersCollection.add(user);
  }

  async getProjectUser(username: string) {
    let auxCollection: AngularFirestoreCollection;
    auxCollection = await this.afs.collection('users', ref => ref.where('email','==', username));
    return await auxCollection.valueChanges();
  }

  async loadAllUser() {
    await this.usersCollection.valueChanges().subscribe(res => {
      this.users = [];
      res.map(data => {
        let user = data as UserExt;
        if(typeof user.urlImage != 'undefined' && user.urlImage != '') {
          this.getUrlImage(user.urlImage).subscribe(res => {
            user.uriImage = res;
          });
        }
        else {
          user.uriImage = 'assets/imgs/default_profile.png';
        }
        this.users.push(user);
      });
    });
  }

  getAllUser() {
    return this.users;
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
