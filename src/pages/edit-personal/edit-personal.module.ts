import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPersonalPage } from './edit-personal';

@NgModule({
  declarations: [
    EditPersonalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPersonalPage),
  ],
})
export class EditProfilePageModule {}
