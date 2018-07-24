import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { timer } from 'rxjs/Observable/timer';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

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
    public viewCtrl: ViewController, private authService: AuthServiceProvider) {
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
        this.navCtrl.setRoot(HomePage);
      }
      else {
        this.ionViewDidEnter();
      }
    });
  }

}
