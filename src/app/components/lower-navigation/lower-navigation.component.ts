import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lower-navigation',
  templateUrl: './lower-navigation.component.html',
  styleUrls: ['./lower-navigation.component.scss']
})

export class LowerNavigationComponent {
  @Input() buttonData: string;
  @Output() handleGoTo:  EventEmitter<any> = new EventEmitter<any>();
  @Output() handleBackward:  EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) { }

  nextPage() {
    this.handleGoTo.emit('forward');
  }

  prevPage() {
    this.handleGoTo.emit('backward');
  }
}

