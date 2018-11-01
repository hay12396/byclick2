import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenComponent } from './components/open/open.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import {EventDetailsComponent} from './components/event-details/event-details.component';
import {DocUploadComponent} from "./components/doc-upload/doc-upload.component";
import {SummaryComponent} from "./components/summary/summary.component";

const routes: Routes = [
  { path: '', component: OpenComponent },
  { path: 'open', component: OpenComponent },
  { path: 'personal-data', component: PersonalDataComponent },
  { path: 'event-details', component: EventDetailsComponent },
  { path: 'doc-uploads', component: DocUploadComponent },
  { path: 'summary', component: SummaryComponent },
  { path: '**', component: OpenComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
