import {Injectable} from '@angular/core';
import {eventsData} from "./events-data";
import {Event} from "./event";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {EVENTS_KEY, LocalStorageService} from "../local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events: Event[];
  private displayEvents: Event[];

  private filterStartDate: Date;
  private filterEndDate: Date;

  private eventRefreshBehavior$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  public eventsRefreshed: Observable<Event[]> = this.eventRefreshBehavior$.asObservable();

  private eventChangedSubject$: Subject<Event[]> = new Subject<Event[]>(); // it is a subject to not call before it is triggered
  public eventsChanged: Observable<Event[]> = this.eventChangedSubject$.asObservable();

  private eventEditSubject$: Subject<Event> = new Subject<Event>();
  public eventEdit: Observable<Event> = this.eventEditSubject$.asObservable();


  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.initialize();
  }

  private initialize(): void {
    this.filterStartDate = null;
    this.filterEndDate = null;
    if (this.readEventsFromStorage() === null) {
      this.saveEventsToStorage(eventsData);
    }
    this.refreshDataFromStorage();
    this.displayEvents = this.events;
  }

  getEvents(): Event[] {
    return this.displayEvents;
  }


  deleteEvent(event: Event): void {
    this.events.splice(this.findEventPositionInCollectionById(this.events, event), 1);
    this.saveEventsToStorage(this.events);
    this.eventsChange();
  }

  addEvent(event: Event): void {
    event.id = Math.max(...this.events.map(function (e: Event) {
      return e.id;
    })) + 1;
    this.events.push(event)
    this.saveEventsToStorage(this.events);
    this.eventsChange();
  }

  updateEvent(event: Event) {
    this.events = this.events.map((e: Event) => e.id === event.id ? event : e);
    this.saveEventsToStorage(this.events);
    this.eventsChange();
  }

  editEvent(event: Event): void {
    this.eventEditSubject$.next(event);
  }

  refreshEventsOrder(events: Event[]): void {
    this.displayEvents = events
    this.eventsRefresh();
  }

  public setStartDateFilter(date: Date): void {
    this.filterStartDate = new Date(date);
    this.eventsChange();
  }

  public setEndDateFilter(date: Date): void {
    this.filterEndDate = new Date(date);
    this.eventsChange();
  }

  private filterEvents(): void {
    this.displayEvents = this.events.filter((event: Event) => {
      return (this.filterStartDate == null || new Date(event.startDate) >= this.filterStartDate)
        && (this.filterEndDate == null || new Date(event.endDate) <= this.filterEndDate);
    });
  }

  private eventsChange(): void {
    this.filterEvents();
    this.eventChangedSubject$.next(this.displayEvents);
    this.eventsRefresh();
  }

  private eventsRefresh(): void {
    this.eventRefreshBehavior$.next(this.displayEvents);
  }

  private refreshDataFromStorage(): void {
    this.events = this.readEventsFromStorage();
  }


  private saveEventsToStorage(events: Event[]): void {
    this.localStorageService.setItem(EVENTS_KEY, events);
  }

  private readEventsFromStorage(): Event[] {
    return this.localStorageService.getItem(EVENTS_KEY);
  }

  private findEventPositionInCollectionById(events: Event[], event: Event): number {
    return events.indexOf(events.filter((e: Event) => {
      return e.id === event.id;
    }).at(0))
  }
}
