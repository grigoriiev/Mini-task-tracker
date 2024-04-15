import {Injectable} from '@angular/core';
import {Task} from './task';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private tasksUrl = 'api/tasks';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }


  /** GET tasks from the server */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(_ => this.log('fetched tasks')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }


  /** GET tasks from the server */

  /** GET task by id. Will 404 if id not found */
  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  /** PUT:  hero on the server */
  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /** POST: add a new task to the server */
  addTask(task: Task) {
    return this.http.post(this.tasksUrl, task, this.httpOptions).pipe(
      tap((newTask: any) => this.log(`added task w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  /** DELETE: delete the task from the server */
  deleteTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  /* GET tasks whose name contains search term */
  searchTasks(term: string) {
    if (!term.trim()) {
      // if not search term, return all task array.
      return this.http.get(this.tasksUrl)
        .pipe(
          tap(_ => this.log('search tasks')),
          catchError(this.handleError('searchTasks', []))
        );
    }
    /*
    *
    *
    *Для хранения информации используем  InMemoryDataService
    * Запрос на фильтрацию идёт в  InMemoryDataService
    * Там нельзя фильтровалась по нескольким параметрам
    * Есть возможность отдельно тестировать:
    * ${this.tasksUrl}/?performers=${term}
    * ${this.tasksUrl}/?status=${term}
    * ${this.tasksUrl}/?deadline=${term}
    * {this.tasksUrl}/?name=${term}
    * Но на боевом сервере url запроса изменим на
    * ${this.tasksUrl}/?performers=${term}&status=${term}&deadline=${term}&name=${term}
    *Ответ должен прийти performers or status or deadline or name
    * */

    return this.http.get(`${this.tasksUrl}/?performers=${term}`).pipe(
      tap(_ => this.log('search tasks')),
      catchError(this.handleError('searchHeroes', [])))
  }

  /**
   * Handle Http operation that failed.jhj
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {

    this.messageService.add(`TaskService: ${message}`);
  }

}
