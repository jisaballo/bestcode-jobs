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

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  showSplash = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public splashScreen: SplashScreen, 
    public viewCtrl: ViewController, private authService: AuthServiceProvider, private uniqueDeviceID: UniqueDeviceID,
    private userService: UserServiceProvider, private notifyService: NotifyServiceProvider, private favoriteService: FavoriteServiceProvider,
    private logService: LogsServiceProvider) {

    this.OnLoad();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

  OnLoad() {
    let text: string;
    if(!this.authService.authenticated()) {
      this.authService.autoLogin().then(res => {
        if(res) {
          if(res[0] == 'OK') {
            this.LoadUserSetting(this.authService.getUserEmail()); 
          }
        }
        this.navCtrl.setRoot(TabsPage);
      });
    }
  }

  LoadUserSetting(email: string) {
    //load user
    this.userService.getUserID(email).subscribe(res => {
      res.map(data => {
        let userID = data.payload.doc.id;

        this.userService.LoadProfile(userID);
        this.notifyService.loadNotification(userID);
        this.favoriteService.loadFavorites(userID);
        this.logService.loadLogs(userID);
        this.userService.loadAllUser();

        this.showSplash = false
      })
    });
  }

}
