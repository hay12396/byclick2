import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jsPDF  from 'jspdf';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss']
})
export class OpenComponent implements OnInit {

  constructor( private router: Router){ }

  ngOnInit() { }


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
