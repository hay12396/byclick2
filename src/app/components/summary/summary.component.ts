import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  section  = 'summary';
  goToPage = 'open';
  getBack  = 'doc-uploads';

  constructor(private router: Router) { }

  ngOnInit() {

  }

  handleGoTo(e) {
    if (e === 'forward'){
      this.router.navigate([`/${this.goToPage}`]);
    } else {
      this.router.navigate([`/${this.getBack}`]);
    }
  }

}
