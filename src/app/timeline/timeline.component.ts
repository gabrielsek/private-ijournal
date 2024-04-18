import { Component } from '@angular/core';
import {EventService} from "../event/event.service";
import {Event} from "../event/event";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  events: Event[];

  constructor(
    private eventService: EventService
  ) {
    eventService.eventsRefreshed.subscribe((value: Event[]) => this.events = value);
  }

  formatDates(event: Event): string {
    return '' + formatDate(event.startDate, 'fullDate', 'en')
      + ' - ' + formatDate(event.endDate, 'fullDate', 'en');
  }
}
