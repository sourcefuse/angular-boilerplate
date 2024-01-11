import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailsRoutingModule} from './details-routing.module';
import {ComponentDetailsComponent} from './components/component-details/component-details.component';
import {LiveDemoComponent} from './components/live-demo/live-demo.component';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';
import {FormsModule} from '@angular/forms';
import {NbTabsetModule} from '@nebular/theme';

@NgModule({
  declarations: [ComponentDetailsComponent, LiveDemoComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbTabsetModule,
    DetailsRoutingModule,
    MonacoEditorModule.forRoot(),
  ],
  exports: [ComponentDetailsComponent],
})
export class DetailsModule {}
