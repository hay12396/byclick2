import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as jsPDF  from 'jspdf';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss']
})
export class OpenComponent implements OnInit {

  constructor( private router: Router, private route: ActivatedRoute){ }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if (params.section) {
          console.log(params.section);
        }
      });
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
