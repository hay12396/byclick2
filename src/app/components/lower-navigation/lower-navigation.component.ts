import {Component, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lower-navigation',
  templateUrl: './lower-navigation.component.html',
  styleUrls: ['./lower-navigation.component.scss']
})

export class LowerNavigationComponent {
  @Input() goToPage: string;
  @Input() getBack: string;
  @Input() buttonData: string;

  constructor(private router: Router) { }

  nextPage() {
    this.router.navigate([`/${this.goToPage}`]);
  }

  prevPage() {
    this.router.navigate([`/${this.getBack}`]);
  }
}

