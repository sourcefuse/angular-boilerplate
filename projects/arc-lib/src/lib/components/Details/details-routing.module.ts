import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentDetailsComponent } from './components/component-details/component-details.component';

const routes: Routes = [
  {
    path: '',
    component:ComponentDetailsComponent
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
