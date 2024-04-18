import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {EventService} from "../event/event.service";
import {Event} from "../event/event";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, HttpClientModule],
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent {

  public inputForm: FormGroup;
  public isEditMode: boolean;

  private originalEvent: Event;
  private imageBase64: string;
  public fileNotUploaded: boolean;

  private reader: FileReader;


  constructor(
    private eventService: EventService) {
    this.disableEditMode();
    this.reader = new FileReader();
    this.eventService.eventEdit.subscribe((event: Event) => {
      this.isEditMode = true;
      this.originalEvent = event;
      this.fileNotUploaded = false;
      this.imageBase64 = this.originalEvent.image;
      this.initializeFormWithData(event);
    })
  }

  private initializeForm(): void {
    this.inputForm = new FormGroup<any>({
      name: new FormControl<string | null>(null),
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
      description: new FormControl<string | null>(null),
      image: new FormControl<string | null>(null),
      category: new FormControl<string | null>(null),
    })
  }

  private initializeFormWithData(event: Event): void {
    this.inputForm = new FormGroup<any>({
      name: new FormControl<string | null>(event.name),
      startDate: new FormControl<Date | null>(event.startDate),
      endDate: new FormControl<Date | null>(event.endDate),
      description: new FormControl<string | null>(event.description),
      image: new FormControl<string | null>(''),
      category: new FormControl<string | null>(event.category),
    })
  }

  submit(): void {
    if (this.validateForm())
      return;
    this.eventService.addEvent(this.createEvent());
    this.inputForm.reset();
  }

  cancel(): void {
    this.inputForm.reset();
    this.disableEditMode();
  }

  update(): void {
    if(this.validateForm())
      return;
    this.eventService.updateEvent(this.createEvent());
    this.disableEditMode();
  }

  private createEvent(): Event {
    return <Event>{
      id: this.originalEvent?.id,
      name: this.inputForm.value.name,
      startDate: this.inputForm.value.startDate,
      endDate: this.inputForm.value.endDate,
      description: this.inputForm.value.description,
      image: this.imageBase64,
      category: this.inputForm.value.category,
    }
  }

  private validateForm(): boolean {
    if (this.inputForm.value.image === null && this.imageBase64 === null) {
      this.fileNotUploaded = true;
      return true;
    }
    return this.inputForm.invalid;
  }

  private disableEditMode(): void {
    this.isEditMode = false;
    this.imageBase64 = null;
    this.initializeForm();
  }

  onFileSelected($event): void {
    const file:File = $event.target.files[0];
    if (file) {
      this.fileNotUploaded = false;
      this.reader.readAsDataURL(file);

      this.reader.addEventListener('load', () => {
        this.imageBase64 = this.reader.result.toString();
      })
    }
  }
}
