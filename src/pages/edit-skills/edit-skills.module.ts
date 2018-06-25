import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSkillsPage } from './edit-skills';

@NgModule({
  declarations: [
    EditSkillsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditSkillsPage),
  ],
})
export class EditSkillsPageModule {}
