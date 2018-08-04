import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { RecruitPage } from '../pages/recruit/recruit';
import { ProjectPage } from '../pages/project/project';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { NewProjectPageModule } from '../pages/new-project/new-project.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { ProjectDetailPageModule } from '../pages/project-detail/project-detail.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { EditProfilePageModule } from '../pages/edit-personal/edit-personal.module';
import { EditAboutmePageModule } from '../pages/edit-aboutme/edit-aboutme.module';
import { EditExpertisePageModule } from '../pages/edit-expertise/edit-expertise.module';
import { EditSkillsPageModule } from '../pages/edit-skills/edit-skills.module';
import { EditJobPreferencesPageModule } from '../pages/edit-job-preferences/edit-job-preferences.module';
import { SupportPageModule } from '../pages/support/support.module';
import { TermsPageModule } from '../pages/terms/terms.module';
import { NotificationPageModule } from '../pages/notification/notification.module';
import { FavoritesPageModule } from '../pages/favorites/favorites.module';
import { SplashPageModule } from '../pages/splash/splash.module';
import { ContactPageModule } from '../pages/contact/contact.module';
import { NewAccountPageModule } from '../pages/new-account/new-account.module';
import { MessagesPageModule } from '../pages/messages/messages.module';
import { MessageDetailPageModule } from '../pages/message-detail/message-detail.module';

import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ProjectServiceProvider } from '../providers/project-service/project-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { DateServiceProvider } from '../providers/date-service/date-service';
import { NotifyServiceProvider } from '../providers/notify-service/notify-service';
import { FavoriteServiceProvider } from '../providers/favorite-service/favorite-service';

import { ProjectFirebase } from '../models/project';
import { NotificationFirebase } from '../models/notification';
import { UserFirebase } from '../models/user';
import { FavoriteFirebase } from '../models/favorites';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { LogsServiceProvider } from '../providers/logs-service/logs-service';
import { LogsFirebase } from '../models/log';
import { MessageServiceProvider } from '../providers/message-service/message-service';
import { ChatFirebase } from '../models/chat';

@NgModule({
  declarations: [
    MyApp,
    RecruitPage,
    ProjectPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ContactPageModule,
    EditAboutmePageModule,
    EditExpertisePageModule,
    EditJobPreferencesPageModule,
    EditProfilePageModule,
    EditSkillsPageModule,
    FavoritesPageModule,
    LoginPageModule,
    NewProjectPageModule,
    NotificationPageModule,
    ProfilePageModule,
    ProjectDetailPageModule,
    RegisterPageModule,
    SettingsPageModule,
    SplashPageModule,
    SupportPageModule,
    TermsPageModule,
    NewAccountPageModule,
    MessagesPageModule,
    MessageDetailPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecruitPage,
    ProjectPage,
    HomePage,
    TabsPage
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
    UniqueDeviceID,
    DateServiceProvider,
    NotifyServiceProvider,
    NotificationFirebase,
    FavoriteServiceProvider,
    FavoriteFirebase,
    LogsServiceProvider,
    LogsFirebase,
    MessageServiceProvider,
    ChatFirebase
  ]
})
export class AppModule {}
