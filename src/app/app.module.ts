import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { RecruitPage } from '../pages/recruit/recruit';
import { ProjectPage } from '../pages/project/project';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { NewProjectPage } from '../pages/new-project/new-project';
import { SettingsPage } from '../pages/settings/settings';
import { ProjectDetailPage } from '../pages/project-detail/project-detail';
import { ProfilePage } from '../pages/profile/profile';
import { EditPersonalPage } from '../pages/edit-personal/edit-personal';
import { EditAboutmePage } from '../pages/edit-aboutme/edit-aboutme';
import { EditExpertisePage } from '../pages/edit-expertise/edit-expertise';
import { EditSkillsPage } from '../pages/edit-skills/edit-skills';
import { EditJobPreferencesPage } from '../pages/edit-job-preferences/edit-job-preferences';
import { SupportPage } from '../pages/support/support';
import { TermsPage } from '../pages/terms/terms';
import { NotificationPage } from '../pages/notification/notification';
import { ContactPage } from '../pages/contact/contact';

import { FIREBASE_CONFIG } from './app.firebase.config';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ProjectServiceProvider } from '../providers/project-service/project-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { DateServiceProvider } from '../providers/date-service/date-service';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { NotifyServiceProvider } from '../providers/notify-service/notify-service';

import { ProjectFirebase } from '../models/project';
import { NotificationFirebase } from '../models/notification';
import { UserFirebase } from '../models/user';

@NgModule({
  declarations: [
    MyApp,
    RecruitPage,
    ProjectPage,
    HomePage,
    LoginPage,
    RegisterPage,
    SettingsPage,
    NewProjectPage,
    TabsPage,
    ProjectDetailPage,
    ProfilePage,
    EditPersonalPage,
    EditAboutmePage,
    EditExpertisePage,
    EditSkillsPage,
    EditJobPreferencesPage,
    SupportPage,
    TermsPage,
    NotificationPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecruitPage,
    ProjectPage,
    HomePage,
    LoginPage,
    RegisterPage,
    SettingsPage,
    NewProjectPage,
    TabsPage,
    ProjectDetailPage,
    ProfilePage,
    EditPersonalPage,
    EditAboutmePage,
    EditExpertisePage,
    EditSkillsPage,
    EditJobPreferencesPage,
    SupportPage,
    TermsPage,
    NotificationPage,
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ProjectServiceProvider,
    ProjectFirebase,
    UserServiceProvider,
    UserFirebase,
    Camera,
    Crop,
    Base64,
    DateServiceProvider,
    NotifyServiceProvider,
    NotificationFirebase
  ]
})
export class AppModule {}
