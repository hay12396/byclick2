import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MessengerService} from '../../services/messenger.service';
import {DataService} from '../../services/data-service.service';
import {MatCheckboxChange} from '@angular/material';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  @ViewChild('firstName') inputEl: ElementRef;
  focus: boolean;
  contactDate;
  contactData;
  postOffice;
  isContactChecked;
  isClientChecked;
  isSpouseChecked;
  isChildChecked;
  isContactRelatedChecked;


  form = this.fb.group({
    basicInfo: this.fb.group ({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idNumber: ['', Validators.required],
      hmo: '',
      birthday: ['', Validators.required]
    })
  });
  formContact = this.fb.group({
    contactInfo: this.fb.group ({
      contactFirstName: ['', Validators.required],
      contactLastName:  ['', Validators.required],
      contactIdNumber:  ['', Validators.required],
      contactCellPhone: ['', Validators.required],
      contactRelationType: ['', Validators.required],
      contactEmail: ['', Validators.required],
      contactCity: ['', Validators.required],
      contactStreet: ['', Validators.required],
      contactHouseNumber: ['', Validators.required],
      contactZipCode: ['', Validators.required],
      clientType: '',
      contactRelation: ''
    })
  });
  cities = [
    {name: 'תל אביב'},
    {name: 'ירושלים'},
    {name: 'חיפה'},
  ];

  streets = [
    {name: 'אלנבי'},
    {name: 'ויצמן'},
    {name: 'דיזנגוף'},
  ];
  constructor (
    private messenger: MessengerService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder ) { }

  ngOnInit() {

    this.messenger.setMessage('personal');
    this.contactDate = new Date();
    this.contactDate.setFullYear(this.contactDate.getFullYear() - 18);
    this.isContactChecked = 'contact';

  }

  saveClient() {}

  onFocus(e: FocusEvent) {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
  }
  requiredForm(name: string) {
    return (
      this.form.get(`basicInfo.${name}`).hasError('required') &&
      this.form.get(`basicInfo.${name}`).dirty
    );
  }

  requiredFormContact(name: string) {
    return (
      this.formContact.get(`contactInfo.${name}`).hasError('required') &&
      this.formContact.get(`contactInfo.${name}`).dirty
    );
  }

  endDateChange(e) {
    const cDate = this.contactDate.getFullYear() - 18;
    const eDate = e.value.getFullYear();
    this.contactData = eDate > cDate;
  }

  saveContact() {}

  onChange(e: MatCheckboxChange) {
    console.log(e);
    this.postOffice = e.checked;
  }

  selectCity(city: { name: string }) {
    this.formContact.patchValue({
      contactInfo: { contactCity: city.name }
    });
  }

  selectStreet(street: { name: string }) {
    this.formContact.patchValue({
      contactInfo: { contactStreet: street.name }
    });
  }

  goBack() {
    this.router.navigate(['/open']);
  }
  eventDetails() {
    this.router.navigate(['/event-details']);
  }

  selectedClient(e) {
    this.formContact.patchValue({
      contactInfo: {
        clientType: e.value
      }
    });
    if ( e.value === 'contact' ) {
      this.isClientChecked = false;
    } else {
      this.isContactChecked = false;
    }
  }

  selectedRelation(e) {
    this.formContact.patchValue({
      contactInfo: {
        contactRelation: e.source.value
      }
    });
    console.log(this.formContact.controls['contactInfo'].value);
  }
}
