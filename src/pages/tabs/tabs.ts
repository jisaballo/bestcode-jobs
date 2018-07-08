import { Component } from '@angular/core';

import { RecruitPage } from '../recruit/recruit';
import { HomePage } from '../home/home';
import { ProjectPage } from '../project/project';
import { SettingsPage } from '../settings/settings'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RecruitPage;
  tab3Root = ProjectPage;
  tab4Root = SettingsPage;

  tab3BadgeCount : number = 0; // default 0

  constructor() {

  }
}
