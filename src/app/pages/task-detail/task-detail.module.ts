import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDetailRoutingModule } from './task-detail-routing.module';
import { TaskDetailComponent } from './task-detail.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    TaskDetailRoutingModule
  ]
})
export class TaskDetailModule { }
