import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAboutmePage } from './edit-aboutme';

@NgModule({
  declarations: [
    EditAboutmePage,
  ],
  imports: [
    IonicPageModule.forChild(EditAboutmePage),
  ],
})
export class EditAboutmePageModule {}
