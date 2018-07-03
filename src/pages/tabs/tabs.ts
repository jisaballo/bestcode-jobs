import { Component } from '@angular/core';

import { RecruitPage } from '../recruit/recruit';
import { HomePage } from '../home/home';
import { NotificationPage } from '../notification/notification';
import { SettingsPage } from '../settings/settings'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RecruitPage;
  tab3Root = NotificationPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
