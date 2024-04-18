import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TimelineComponent} from './timeline/timeline.component';
import {TableComponent} from './table/table.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TimelineModule} from "primeng/timeline";
import {CardModule} from "primeng/card";
import {InputFormComponent} from "./input-form/input-form.component";
import {FilterSectionComponent} from "./filter-section/filter-section.component";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpClient} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import {FieldsetModule} from "primeng/fieldset";

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatNativeDateModule,
    TimelineModule,
    CardModule,
    InputFormComponent,
    FilterSectionComponent,
    NgOptimizedImage,
    FieldsetModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
