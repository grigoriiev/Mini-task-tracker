import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): any {

    const tasks:Task[] = [
     { id: 1, name: 'Создать первою страницу',title:"Создать сайт посвященный компьютерам",priority:"Первая очередь", status:"В процессе" ,deadline:"April 9, 2024", performers:["Author One","Author Two"]},
      { id: 2, name: 'Создать вторую страницу',title:"Создать сайт посвященный машинам" ,priority:"Вторая очередь", status:"Завершен" , deadline:"April 10, 2024",performers:["Author One","Author Two"]},
      { id: 3, name: 'Создать третью страницу' ,title:"Создать сайт посвященный видео роликам",priority:"Третья очередь", status:"Создан" ,deadline:"April 23, 2024", performers:["Author One","Author Two"]},
      { id: 4, name: 'Создать четвертою страницу' ,title:"Создать сайт посвященный видео техники",priority:"Последния очередь", status:"Отменен" , deadline:"April 4, 2024",performers:["Author One","Author Two"]},
      { id: 5, name: 'Создать пятою страницу',title:"Создать сайт посвященный бытовой техники",priority:"Третья очередь", status:"Провален"  ,deadline:"April 6, 2024", performers:["Author One","Author Two"]},
      { id: 6, name: 'Создать шестою страницу',title:"Создать сайт посвященный видео играм",priority:"Третья очередь" , status:"Создан" , deadline:"April 8, 2024",performers:["Author One","Author Two"]},
      { id: 7, name: 'Создать седьмую страницу',title:"Создать сайт посвященный автомобилям",priority:"Третья очередь" , status:"Создан" ,deadline:"April 10, 2024", performers:["Author One","Author Two"]},
      { id: 8, name: 'Создать восьмую страницу' ,title:"Создать сайт посвященный созданию сайтам",priority:"Третья очередь", status:"Создан" , deadline:"April 15, 2024",performers:["Author One","Author Two"]},
      { id: 9, name: 'Создать деятую страницу',title:"Создать сайт посвященный домам" ,priority:"Третья очередь", status:"Создан" , deadline:"April 17, 2024",performers:["Author One","Author Two"]}
    ];
    return {tasks};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the tasks array is empty,
  // the method below returns the initial number (11).
  // if the tasks array is not empty, the method below returns the highest
  // task id + 1.
  genId(tasks: Task[] ) {
    return tasks.length > 0 ? Math.max(...tasks.map((task:Task|any) => task.id)) + 1 : 11;
  }
}
