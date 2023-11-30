import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSettingComponent } from './all-setting/all-setting.component';

const routes: Routes = [
  {path:'',component:AllSettingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
