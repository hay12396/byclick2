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
      insuranceCompanyName: ['', Validators.required]
    }),
    clientResidence: this.fb.group({
      clientResidenceType: ['', Validators.required],
      clientCity: ['', Validators.required],
      clientStreet: ['', Validators.required],
      clientHouseNumber: ['', Validators.required],
      clientZipCode: ['', Validators.required]
    }),
    generalData: this.fb.group({
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

  ngOnInit() {}

  saveEvent() {}

  causeSelected(e) {
    this.form.patchValue({
      eventData: {
        cause: e.value
      }
    });
    if ( e.value === 'accident' ) {
      this.isIllnessChecked = false;
    } else {
      this.isAccidentChecked = false;
    }
  }

  requiredForm(name: string) {
    return (
      this.form.get(`eventData.${name}`).hasError('required') &&
      this.form.get(`eventData.${name}`).dirty
    );
  }
  requiredGeneral(name: string) {
    return (
      this.form.get(`generalData.${name}`).hasError('required') &&
      this.form.get(`generalData.${name}`).dirty
    );
  }

  checkAnotherPolicy(e) {
    this.form.patchValue({
      eventData: {
        anotherPolicy: e.value
      }
    });
    if ( e.value === 'yes' ) {
      this.isNotAnotherPolicy = false;
    } else {
      this.isAnotherPolicy = false;
    }
  }

  selectedResidence(e: MatButtonToggleChange) {
    this.form.patchValue({
      clientResidence: {
        clientResidenceType: e.value
      }
    });
    if ( e.value === 'yes' ) {
      this.isNotAnotherPolicy = false;
    } else {
      this.isAnotherPolicy = false;
    }
  }
  selectInstitute(institute: { name: string }) {
    this.form.patchValue({
      generalData: { institutionType: institute.name }
    });
    console.log(this.form.value);
  }
  selectInstituteAddress(address) {
    this.form.patchValue({
      generalData: { institutionAddress: address.name }
    });
  }

  eligibilitySelected(e: MatButtonToggleChange) {
    this.form.patchValue({
      generalData: {
        eligibilityFromAnotherParty: e.value
      }
    });
    if ( e.value === 'yes' ) {
      this.isNotEligibilityFromAnotherParty = false;
    } else {
      this.isEligibilityFromAnotherParty = false;
    }
  }

  foreignWorkerSelect(e: MatButtonToggleChange) {
    this.form.patchValue({
      generalData: {
        foreignWorkerEmployment: e.value
      }
    });
    if ( e.value === 'yes' ) {
      this.isNotForeignWorkerEmployment = false;
    } else {
      this.isForeignWorkerEmployment = false;
    }
  }
  selectEntitlement(entitlement: { name: string }) {
    this.form.patchValue({
      generalData: { entitlementFactors: entitlement.name }
    });
    console.log(this.form.value);
  }
}
