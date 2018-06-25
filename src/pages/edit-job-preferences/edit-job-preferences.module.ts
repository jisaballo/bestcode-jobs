import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditJobPreferencesPage } from './edit-job-preferences';

@NgModule({
  declarations: [
    EditJobPreferencesPage,
  ],
  imports: [
    IonicPageModule.forChild(EditJobPreferencesPage),
  ],
})
export class EditJobPreferencesPageModule {}
