import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntroductionComponent} from './components/introduction/introduction.component';
import {GettingStartedRoutingModule} from './getting-started-routing.module';

@NgModule({
  declarations: [IntroductionComponent],
  imports: [CommonModule, GettingStartedRoutingModule],
})
export class GettingStartedModule {}
