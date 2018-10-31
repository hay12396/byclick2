import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {MessengerService} from '../../services/messenger.service';
import * as jsPDF  from 'jspdf';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss']
})
export class OpenComponent implements OnInit, OnDestroy {
  watcher: Subscription;
  activeMediaQuery = '';
  am = 'xs';
  height = '';


  constructor(media: ObservableMedia, private router: Router, private messengerService: MessengerService) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change.mqAlias || '';
      console.log(`Media query --> ${change.mqAlias}`);
    });
  }

  ngOnInit() {
    const elm = document.getElementById('open-container');
    console.log(window.screen.availHeight);
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  startTheForm(): void {
    this.router.navigate(['/personal-data']);
  }

// Temp Download form
  downloadConfidentialityForm() {
    const doc = new jsPDF();

    doc.text(20,20,'confidentiality waver');
    doc.addPage();

    doc.save('confidentiality.pdf');
  }

}
