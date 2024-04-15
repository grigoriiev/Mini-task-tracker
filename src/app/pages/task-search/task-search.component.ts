import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators'
import {TaskService} from '../../task.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";


@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss']
})


export class TaskSearchComponent implements AfterViewInit, OnInit {
  heroes$: any;

  displayedColumns: string[] = ['id', 'name', 'title', 'priority', 'status','deadline', 'performers', 'edit'];
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any
  private searchTerms = new Subject<string>();

  constructor(private taskService: TaskService, private _liveAnnouncer: LiveAnnouncer) {

  }


  // Push a search term into the observable stream.

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  search(term: string): void {

    this.searchTerms.next(term);


    let a: any = []
    this.heroes$.subscribe((e: any) => {
        for (let i = 0; i < e.length; i++) {
          a.push(e[i])
        }
        this.dataSource = new MatTableDataSource(a)
        this.dataSource.sort = this.sort;
      }
    )
  }

  ngAfterViewInit() {


    this.searchTerms.next('');

  }

  ngOnInit(): void {

    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.taskService.searchTasks(term)),
    );


    let a: any = []
    this.heroes$.subscribe((e: any) => {
        for (let i = 0; i < e.length; i++) {
          a.push(e[i])
        }
        this.dataSource = new MatTableDataSource(a)
        this.dataSource.sort = this.sort;
      }
    )


  }

}
