import { Component, OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-expansion',
  templateUrl: './summary-expansion.component.html',
  styleUrls: ['./summary-expansion.component.scss']
})
export class SummaryExpansionComponent implements OnInit {
  @Input() source: string;
  @Input() header: string;
  @Input() lines: object;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('expansion');
  }

  editSection() {
    this.router.navigate([`/${this.source}`],{ queryParams: { section: `summary` }});
  };
}

