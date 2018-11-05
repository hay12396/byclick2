import {Component, OnDestroy, OnInit} from '@angular/core';
import { MessengerService } from './services/messenger.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private messageSubscription;

  constructor(
    private messengerService: MessengerService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.messageSubscription = this.messengerService.message.subscribe(msg => { });
  }
  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
