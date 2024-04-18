import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventService} from "../event/event.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";

@Component({
  selector: 'app-filter-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule],
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss']
})
export class FilterSectionComponent {

  public filterForm: FormGroup;

  constructor(
    private eventService: EventService,
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.filterForm = new FormGroup({
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
    })
  }

  dateChange(): void {
    if (this.filterForm.invalid) {
      return;
    }

    if (this.filterForm.value.startDate){
      this.eventService.setStartDateFilter(this.filterForm.value.startDate);
    }

    if (this.filterForm.value.endDate){
      this.eventService.setEndDateFilter(this.filterForm.value.endDate);
    }

  }
}
