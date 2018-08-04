import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Base64 } from '@ionic-native/base64';
import { UserFirebase, User, Experience, Skill } from '../../models/user';
import { MessageServiceProvider } from '../message-service/message-service';

export interface UserExt extends User {
  id: string;
  password: string;
  uriImage: string;
}

export interface ExperienceExt extends Experience {

}

export interface SkillExt extends Skill {
  
}

@Injectable()
export class UserServiceProvider {

  task: AngularFireUploadTask;
  image: string;

  users: UserExt[];

  //own user

  private profile: UserExt;

  constructor(private base64: Base64, public http: HttpClient, private afStorage: AngularFireStorage, private userFirebase: UserFirebase) {
  }

  getUserID(email: string) {
    return this.userFirebase.getUserID(email);
  }

  async LoadProfile(userID: string) {
    return await this.userFirebase.LoadProfile(userID).subscribe(res => {
      this.profile = res as UserExt;
      this.profile.id = userID;
      if(typeof this.profile.urlImage != 'undefined' && this.profile.urlImage != '') {
        this.getUrlImage(this.profile.urlImage).subscribe(res => {
          this.profile.uriImage = res;
        });
      }
      else {
        this.profile.uriImage = 'assets/imgs/default_profile.png';
      }
      return this.profile;
    });
  }
  
  async UpdateProfile(user: UserExt) {
    await this.userFirebase.UpdateProfile(user);
  }

  async UpdateUser(user: UserExt) {
    await this.userFirebase.UpdateUser(user);
  }

  async getProfile() {
    return this.profile;
  }
  
  async addUser(user: UserExt) {
    this.userFirebase.addUser(user);
  }

  getUser(userID: string) {
    return this.userFirebase.getUser(userID);
  }

  async loadAllUser() {
    await this.userFirebase.loadAllUser().subscribe(res => {
      this.users = [];
      res.map(data => {
        let user = data.payload.doc.data() as UserExt;
        user.id = data.payload.doc.id;
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

  getUrlImage(filePath: string) {
    try {
      const storageRef: AngularFireStorageReference = this.afStorage.ref(filePath);
      return storageRef.getDownloadURL();
    }
    catch(e) {
      console.error(e);
    }
    
    //defualt url 'assets/imgs/default_profile.png';
  }

  deletePreviousImage(filePath) {
    const storageRef: AngularFireStorageReference = this.afStorage.ref(filePath);
    storageRef.delete();
  }

}
