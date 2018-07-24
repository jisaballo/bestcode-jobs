import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { SplashPage } from '../pages/splash/splash';
import { timer } from 'rxjs/Observable/timer';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { NotifyServiceProvider } from '../providers/notify-service/notify-service';
import { FavoriteServiceProvider } from '../providers/favorite-service/favorite-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = SplashPage;

  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authService: AuthServiceProvider, 
    private userService: UserServiceProvider, private notifyService: NotifyServiceProvider, private favoriteService: FavoriteServiceProvider,
    private uniqueDeviceID: UniqueDeviceID) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.Load();
      timer(2000).subscribe(() => this.showSplash = false);
    });
  }

  Load() {
    this.uniqueDeviceID.get().then(uuid => {
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
                  this.userService.loadAllUser();
                })
              });
            }
          });
        })
      });
    })
    .catch(error => {
      console.error(error);
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
