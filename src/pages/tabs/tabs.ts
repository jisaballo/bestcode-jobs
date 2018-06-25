import { Component } from '@angular/core';

import { RecruitPage } from '../recruit/recruit';
import { ProjectPage } from '../project/project';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProjectPage;
  tab3Root = RecruitPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
