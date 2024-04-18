import {Component} from '@angular/core';
import {Event} from "./event/event";
import {eventsData} from "./event/events-data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string;
  public events: Event[];

  constructor() {
    this.title = 'IJournal';
    this.events = eventsData;
  }


}
