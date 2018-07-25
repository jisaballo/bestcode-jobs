import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { timer } from 'rxjs/Observable/timer';
import { TabsPage } from '../tabs/tabs';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { NotifyServiceProvider } from '../../providers/notify-service/notify-service';
import { FavoriteServiceProvider } from '../../providers/favorite-service/favorite-service';
import { LogsServiceProvider } from '../../providers/logs-service/logs-service';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public splashScreen: SplashScreen, 
    public viewCtrl: ViewController, private authService: AuthServiceProvider, private uniqueDeviceID: UniqueDeviceID,
    private userService: UserServiceProvider, private notifyService: NotifyServiceProvider, private favoriteService: FavoriteServiceProvider,
    private logService: LogsServiceProvider) {

    this.Load();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

  ionViewDidEnter() {
    this.call();
  }

  call() {
    timer(2000).subscribe(() => {
      if(this.authService.state == true) {
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        this.ionViewDidEnter();
      }
    });
  }

  Load() {
    let text: string;
    
    this.uniqueDeviceID.get().then(uuid => {
      text = 'Get phone uuid: ' + uuid;
      this.logService.addToAuth(text, 'Information');
      this.authService.getCredentials(uuid).subscribe(res => {
        res.map(element => {
          let credentials = element.payload.doc.data();

          text = 'Get credentials for user: ' + credentials['username'];
          this.logService.addToAuth(text, 'Information');

          this.authService.login(credentials['username'], credentials['password']).then(res => {
            if(res[0] == 'OK') {
              //load user
              this.userService.getUserID(credentials['username']).subscribe(res => {
                res.map(data => {
                  let userID = data.payload.doc.id;

                  this.userService.LoadProfile(userID);
                  this.notifyService.loadNotification(userID);
                  this.favoriteService.loadFavorites(userID);
                  this.logService.loadLogs(userID);
                  this.userService.loadAllUser();
                })
              });
            }
          });
        })
      });
    })
    .catch(error => {
      text = 'Error trying auto loading ' + error;
      this.logService.addToAuth(text, 'error');
      //for testing
      let uuid = '8a34a38a-3f37-6950-3556-120896651718';
      this.authService.getCredentials(uuid).subscribe(res => {
        res.map(element => {
          let credentials = element.payload.doc.data();

          this.authService.login(credentials['username'], credentials['password']).then(res => {
            if(res[0] == 'OK') {
              //load user
              this.userService.getUserID(credentials['username']).subscribe(res => {
                res.map(data => {
                  let userID = data.payload.doc.id;
                  
                  this.userService.LoadProfile(userID);
                  this.notifyService.loadNotification(userID);
                  this.favoriteService.loadFavorites(userID);
                  this.logService.loadLogs(userID);
                  this.userService.loadAllUser();
                })
              });
            }
          });
        })
      });
    });
  }

}
