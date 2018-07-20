import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { EditPersonalPage } from '../edit-personal/edit-personal';
import { UserServiceProvider, UserExt } from '../../providers/user-service/user-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { EditAboutmePage } from '../edit-aboutme/edit-aboutme';
import { EditExpertisePage } from '../edit-expertise/edit-expertise';
import { DateServiceProvider } from '../../providers/date-service/date-service';
import { EditSkillsPage } from '../edit-skills/edit-skills';
import { EditJobPreferencesPage } from '../edit-job-preferences/edit-job-preferences';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: UserExt;
  myUser: string;
  expertise: any;
  setPop: boolean = true;
  
  constructor(private crop: Crop, public actionSheetCtrl: ActionSheetController, private camera: Camera, public dateService: DateServiceProvider , public authService: AuthServiceProvider, public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.expertise = [];
    console.log(this.setPop);
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad ProfilePage');
    this.Load();
    this.setPop = true;
  }

  ionViewDidLeave() {
    if(this.setPop) {
      this.navCtrl.popToRoot();
    }
  }
  
  async Load() {
    this.user = await this.userService.getProfile();
    this.fixExpertice(this.user);
    //console.log(this.user);
  }

  closePage() {
    this.navCtrl.pop();
  }

  editPersonal(user: UserExt) {
    this.setPop = false;
    this.navCtrl.push(EditPersonalPage, {user});
  }
  editAbout(user: UserExt) {
    this.setPop = false;
    this.navCtrl.push(EditAboutmePage, {user});
  }
  editExpertise(user: UserExt) {
    this.setPop = false;
    this.navCtrl.push(EditExpertisePage, {user});
  }
  editSkills(user: UserExt) {
    this.setPop = false;
    this.navCtrl.push(EditSkillsPage, {user});
  }
  editJobPreferences(user: UserExt) {
    this.setPop = false;
    this.navCtrl.push(EditJobPreferencesPage, {user});
  }
  
  fixExpertice(user: UserExt) {
    this.expertise = user.experience.map(data => {
      //console.log(data);
      let position = data.position;
      let company = data.company;
      let monthStart = this.dateService.getMonthFromID(Number(data.monthStart)).substring(0,3);
      let yearStart = Number(data.yearStart);
      let monthEnd = this.dateService.getMonthFromID(Number(data.monthEnd)).substring(0,3);
      let yearEnd = Number(data.yearEnd);
      
      let years = Number(data.yearEnd) - Number(data.yearStart);
      let month: number;

      if(Number(data.monthStart) > Number(data.monthEnd)) {
        month = 12 - Number(data.monthStart) + Number(data.monthEnd);
        years--;
      }
      else {
        month = Number(data.monthEnd) - Number(data.monthStart);
      }
      let time;
      if(years == 0) {
        time = month + ' meses';
      }
      else {
        time = years + ' años y ' + month + ' meses';
      }

      return {position, company, monthStart, yearStart, monthEnd, yearEnd, time};
    });
  }

  async takePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then(url => {
      this.crop.crop(url, {quality: 50}).then(
        newImage => {
          this.userService.uploadImage(newImage).then(res => {
            this.Load();
          });
        },
        error => console.error('Error cropping', error)
      )
    });
  }

  async selectPicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then(url => {
      this.crop.crop(url, {quality: 50}).then(
        newImage => {
          this.userService.uploadImage(newImage).then(res => {
            this.Load();
          });
        },
        error => console.error('Error cropping', error)
      )
    });
  }

  modifyPicture() {
    this.presentActionSheet();
  }
  
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modificar foto de perfil',
      buttons: [
        {
          text: 'Cámara',
          icon: 'camera',
          handler: () => {
            this.takePicture();
          }
        },{
          text: 'Galeria',
          icon: 'images',
          handler: () => {
            this.selectPicture();
          }
        },{
          text: 'Cancel',
          icon: 'close-circle',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
}
