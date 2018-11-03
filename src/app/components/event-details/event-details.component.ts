import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessengerService } from '../../services/messenger.service';
import { DataService} from '../../services/data-service.service';
import {MatCheckboxChange} from '@angular/material';
import {MatButtonToggleChange} from '@angular/material/typings/button-toggle';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})

export class EventDetailsComponent implements OnInit {
  section  = 'event-details';
  goToPage = 'doc-uploads';
  getBack  = 'personal-data';
  isIllnessChecked;
  isAccidentChecked;
  isAnotherPolicy;
  isNotAnotherPolicy;
  isClientHome;
  isClientInstitute;
  isOtherTypeResidence;
  isEligibilityFromAnotherParty;
  isNotEligibilityFromAnotherParty;
  isForeignWorkerEmployment;
  isNotForeignWorkerEmployment;

  addresses = [
    {name: 'תל אביב'},
    {name: 'ירושלים'},
    {name: 'חיפה'},
  ];

  institutes = [
    {name: 'המוסד לבטיחות וגהות'},
    {name: 'המוסד'},
    {name: 'המוסד לתפקידים מיוחדים'},
  ];

  entitlements = [
    {name: 'המוסד לביטוח לאומי'},
    {name: 'שלוותה'},
    {name: 'תרומות תרומות'},
  ];

  form = this.fb.group({
    eventData: this.fb.group({
      eventDate: ['', Validators.required],
      cause: ['', Validators.required],
      causeDetails: ['', Validators.required],
      anotherPolicy: ['', Validators.required],
      insuranceCompanyName: ['', Validators.required],
      clientResidenceType: ['', Validators.required],
      clientCity: ['', Validators.required],
      clientStreet: ['', Validators.required],
      clientHouseNumber: ['', Validators.required],
      clientZipCode: ['', Validators.required],
      institutionAddress: ['', Validators.required],
      institutionType: ['', Validators.required],
      institutionName: ['', Validators.required],
      foreignWorkerEmployment: ['', Validators.required],
      eligibilityFromAnotherParty: ['', Validators.required],
      entitlementFactors: ['', Validators.required]
    })
  });

  constructor(
    private messenger: MessengerService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder ) { }

  ngOnInit() {
    this.checkIfData();

  }
  checkIfData() {
    let data: any;
    this.form.reset();
    data = JSON.parse(sessionStorage.getItem(`${this.section}`));
    if (!data) {
      return;
    }
    this.form.patchValue({
      eventData: data.eventData });
    this.isIllnessChecked = data.eventData.cause === 'illness'
    this.isAccidentChecked = data.eventData.cause === 'accident';
    this.isAnotherPolicy = data.eventData.anotherPolicy === 'yes';
    this.isNotAnotherPolicy = data.eventData.anotherPolicy === 'no';
    this.isClientHome = data.eventData.clientResidenceType === 'home';
    this.isClientInstitute = data.eventData.clientResidenceType === 'institute';
    this.isOtherTypeResidence = data.eventData.clientResidenceType === 'other';
    this.isForeignWorkerEmployment = data.eventData.foreignWorkerEmployment === 'yes';
    this.isNotForeignWorkerEmployment = data.eventData.foreignWorkerEmployment === 'no';
    this.isEligibilityFromAnotherParty = data.eventData.eligibilityFromAnotherParty === 'yes';
    this.isNotEligibilityFromAnotherParty = data.eventData.eligibilityFromAnotherParty === 'no';

}

  saveEvent() {}

  causeSelected(e) {
    this.form.patchValue({
      eventData: {
        cause: e.value
      }
    });
    this.isIllnessChecked = e.value === 'accident';
    this.isAccidentChecked = e.value === 'accident';
  }

  requiredForm(name: string) {
    return (
      this.form.get(`eventData.${name}`).hasError('required') &&
      this.form.get(`eventData.${name}`).dirty
    );
  }

  checkAnotherPolicy(e) {
    this.form.patchValue({
      eventData: {
        anotherPolicy: e.value
      }
    });
    this.isAnotherPolicy = e.value === 'yes';
    this.isNotAnotherPolicy = e.value === 'no';
  }

  selectedResidence(e: MatButtonToggleChange) {
    this.form.patchValue({
      eventData: {
        clientResidenceType: e.value
      }
    });
    this.isClientHome = e.value === 'home';
    this.isClientInstitute = e.value === 'institute';
    this.isOtherTypeResidence = e.value === 'other';
  }
  selectInstitute(institute: { name: string }) {
    this.form.patchValue({
      eventData: { institutionType: institute.name }
    });
    console.log(this.form.value);
  }
  selectInstituteAddress(address) {
    this.form.patchValue({
      eventData: { institutionAddress: address.name }
    });
  }
  eligibilitySelected(e: MatButtonToggleChange) {
    this.form.patchValue({
      eventData: {
        eligibilityFromAnotherParty: e.value
      }
    });
    this.isEligibilityFromAnotherParty = e.value === 'yes';
    this.isNotEligibilityFromAnotherParty = e.value === 'no';
  }

  foreignWorkerSelect(e: MatButtonToggleChange) {
    this.form.patchValue({
      eventData: {
        foreignWorkerEmployment: e.value
      }
    });
    this.isForeignWorkerEmployment = e.value === 'yes';
    this.isNotForeignWorkerEmployment = e.value === 'no';
  }
  selectEntitlement(entitlement: { name: string }) {
    this.form.patchValue({
      eventData: { entitlementFactors: entitlement.name }
    });
    console.log(this.form.value);
  }

  handleGoTo(e) {
    if (e === 'forward'){
      this.form.get('eventData').statusChanges.subscribe(st => {
        const status = st === 'VALID'; // && !this.contactData ;
      });
      sessionStorage.setItem(`${this.section}`, JSON.stringify(this.form.value));
      this.router.navigate([`/${this.goToPage}`]);
    } else {
      this.form.get('eventData').statusChanges.subscribe(st => {
        const status = st === 'VALID'; // && !this.contactData ;
      });
      sessionStorage.setItem(`${this.section}`, JSON.stringify(this.form.value));
      this.router.navigate([`/${this.getBack}`]);
    }
  }
}
