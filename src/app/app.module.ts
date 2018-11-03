import {MAT_DATE_LOCALE} from '@angular/material';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialAppModule } from './ngmaterial.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LowerNavigationComponent } from './components/lower-navigation/lower-navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { OpenComponent } from './components/open/open.component';
import { DocUploadComponent } from './components/doc-upload/doc-upload.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import {MessengerService} from './services/messenger.service';
import { DataService } from './services/data-service.service';
import {EventDetailsComponent} from './components/event-details/event-details.component';
import {SummaryComponent} from './components/summary/summary.component';
import {SummaryExpansionComponent} from './components/summary-expansion/summary-expansion.component';


@NgModule({
  declarations: [
    AppComponent,
    LowerNavigationComponent,
    OpenComponent,
    PersonalDataComponent,
    DocUploadComponent,
    FooterComponent,
    HeaderComponent,
    EventDetailsComponent,
    SummaryComponent,
    SummaryExpansionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialAppModule,
    MatToolbarModule,
    FlexLayoutModule,
    ScrollingModule
  ],
  providers: [
    DataService,
    MessengerService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'he' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
