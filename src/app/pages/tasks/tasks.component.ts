import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {TaskService} from '../../task.service';
import {FormControl, FormGroup, FormGroupDirective, Validator, Validators} from "@angular/forms";
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {Priority} from "../../priority";
import {Status} from "../../status";


const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [
    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(MY_FORMATS),
  ],
})
/*
*
*
*
* */

export class TasksComponent  {
  heroes: any[] = [];

  authorList: string[] = ['Автор один', 'Автор два', 'Автор три', 'Автор четыре', 'Автор пять', 'Автор шесть'];

  prioritys: Priority[] = [
    {name: 'Первая очередь'},
    {name: 'Вторая очередь'},
    {name: 'Третья очередь'},
    {name: 'Четвертая очередь'}
  ];

  status: Status[] = [
    {name: 'В процессе'},
    {name: 'Завершен'},
    {name: 'Создан'},
    {name: 'Провален'}
  ];
  form = new FormGroup({
    date: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    textTask: new FormControl('', Validators.required),
    prioritys: new FormControl<Priority | null>(null, Validators.required),
    status: new FormControl<Status | null>(null, Validators.required),
    performers: new FormControl(null, Validators.required),

  });

  constructor(private taskService: TaskService, private location: Location) {
  }

  goBack(): void {
    this.location.back();
  }


  submit(myForm: FormGroupDirective) {
    if(myForm.invalid){
      return
    }
    let form=myForm.form.value
    let date= form.date;
    let name= form.name
    let textTask= form.textTask;
    let prioritys= form.prioritys;
    let status= form.status;
    let performers:any[]=[];
    form.performers.forEach((e:any)=>{
      performers.push(e)
    })

    let task={
      name:name,
      title:textTask,
      deadline:date.format('MMMM DD, YYYY'),
      priority:prioritys.name,
      status:status.name,
      performers:performers
    }

    this.taskService.addTask(task)
      .subscribe(hero => {
      this.goBack()
      });

  }
}
