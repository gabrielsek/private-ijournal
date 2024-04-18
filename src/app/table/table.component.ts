import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Event} from "../event/event";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {EventService} from "../event/event.service";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public eventFields: string[];
  public columnDefs: string[];
  public columnNames: string[];
  public dataSource: MatTableDataSource<Event> = new MatTableDataSource<Event>();

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort = new MatSort();

  constructor(
    private eventService:EventService
  ) {
    this.eventFields = ['name', 'startDate', 'endDate', 'description', 'image', 'category'];
    this.columnDefs = ['name', 'startDate', 'endDate', 'description', 'image', 'category', 'actions'];
    this.columnNames = ['Name', 'Start Date', 'End Date', 'Description', 'Image', 'Category', 'Actions'];
    this.dataSource = new MatTableDataSource(eventService.getEvents());
    this.dataSource.connect().subscribe((events: Event[]) => {
      eventService.refreshEventsOrder(events);
    })
    this.eventService.eventsChanged.subscribe((events: Event[]) => {
      this.dataSource.data = events;
    })
  }

  edit(event: Event) {
    this.eventService.editEvent(event);
  }

  delete(event: Event) {
    this.eventService.deleteEvent(event);
    this.dataSource.data = this.eventService.getEvents();
  }
}
