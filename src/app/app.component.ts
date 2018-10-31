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
    this.matIconRegistry.addSvgIcon(
      'attach_file',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/attach_file.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'contact',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/contact.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'contact-white',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/contact-white.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'client',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/client.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'client-white',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/client-white.svg')
    );
  }
  ngOnInit() {
    this.messageSubscription = this.messengerService.message.subscribe(msg => { });
  }
  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
