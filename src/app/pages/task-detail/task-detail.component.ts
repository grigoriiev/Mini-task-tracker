import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {TaskService} from '../../task.service';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Task} from "../../task";
import {Status} from "../../status";



@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: Task;
  authorList: string[] = ['Автор один', 'Автор два', 'Автор три', 'Автор четыре', 'Автор пять', 'Автор шесть'];
  status: Status[] = [
    {name: 'В процессе'},
    {name: 'Завершен'},
    {name: 'Создан'},
    {name: 'Провален'}
  ];

  form = new FormGroup({

    status: new FormControl(null, Validators.required),
    performers: new FormControl(null, Validators.required),

  });

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
  }

  goBack(): void {
    this.location.back();
  }

  save(myForm: FormGroupDirective): void {
    let form = myForm.form.value
    let id = this.task.id;
    let date = this.task.deadline;
    let name = this.task.name
    let textTask = this.task.title;
    let prioritys = this.task.priority;
    let status = form.status ? form.status : this.task.status;
    let performers: any[] = [];
    if (form.performers) {
      form.performers.forEach((e: any) => {
        performers.push(e)
      })
    } else {
      this.task.performers.forEach((e: any) => {
        performers.push(e)
      })
    }


    let task = {
      id: id,
      name: name,
      title: textTask,
      deadline: date,
      priority: prioritys,
      status: status,
      performers: performers
    }

    this.taskService.updateTask(task)
      .subscribe(() => {
        this.goBack()
      });

  }
}
