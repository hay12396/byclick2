import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessengerService } from '../../services/messenger.service';
import { DataService } from '../../services/data-service.service';
import { MatCheckboxChange } from '@angular/material';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})

export class PersonalDataComponent implements OnInit {

  @ViewChild('birthday') birthday: ElementRef;
  @ViewChild('contactCity') contactCity: ElementRef;
  @ViewChild('contactStreet') contactStreet: ElementRef;

  section  = 'personal-data';
  goToPage = 'event-details';
  getBack  = 'open';
  focus: boolean;
  contactDate;
  contactData;
  postOffice;
  isContactChecked;
  isClientChecked;
  isSpouseChecked;
  isChildChecked;
  isContactRelatedChecked;
  contactCitySelected: any;
  contactStreetSelected: any;

  rControl = false;
  routeSub: Subscription;

  contactFirstName: string;

  form = this.fb.group({
    basicInfo: this.fb.group ({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idNumber: ['', Validators.required],
      hmo: '',
      birthday: ['', Validators.required],
      yearNumber: ['', Validators.required],
      monthNumber: ['', Validators.required],
      dayNumber: ['', Validators.required]
    }),
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
      clientType: ['', Validators.required],
      contactRelation: ['', Validators.required],
      byMailOnly: ['', Validators.required]
    })
  });


  cities = [
    {name: 'תל אביב'},
    {name: 'ירושלים'},
    {name: 'חיפה'}
  ];

  streets = [
    {name: 'אלנבי'},
    {name: 'ויצמן'},
    {name: 'דיזנגוף'}
  ];

  constructor (
    private messenger: MessengerService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer : Renderer2,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.routeSub = this.route.queryParams.subscribe(params => {
      if(params.section === 'summary') {
        this.rControl = true;
      }
    });
    this.messenger.setMessage('personal');
    this.contactDate = new Date();
    this.contactDate.setFullYear(this.contactDate.getFullYear() - 18);
    this.contactFirstName = this.form.get('contactInfo.contactFirstName').value || 'No Name Yet';
    this.checkIfData();
  }

  onFocus(e: FocusEvent) {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
  }

  checkIfData() {
    let cDate: number;
    let eDate: number;
    let d: Date;
    let data: any;
    this.form.reset();
    data = JSON.parse(sessionStorage.getItem(`${this.section}`));
    if (!data) {
      return;
    }

    cDate = this.contactDate.getFullYear() - 18;
    eDate = data.basicInfo.yearNumber;
    this.contactData = eDate > cDate;

    this.form.patchValue({
      basicInfo: data.basicInfo });

    this.form.patchValue({
      contactInfo: data.contactInfo });
    if (data.contactInfo.clientType === 'client') {
      this.isClientChecked = true;
    } else {
      this.isContactChecked = true;
    }
    this.postOffice = data.contactInfo.byMailOnly;
    this.isSpouseChecked = data.contactInfo.contactRelation === 'spuse';
    this.isChildChecked = data.contactInfo.contactRelation === 'child';
    this.isContactRelatedChecked = data.contactInfo.contactRelation === 'contact';
    this.contactCitySelected = data.contactInfo.contactCity;
    this.contactStreetSelected = data.contactInfo.contactStreet;
  }

  onBlurYear(e) {
    const cDate = this.contactDate.getFullYear() - 18;
    const eDate = +e.target.value;
    this.contactData = eDate > cDate;
  }
  requiredForm(controlConfig:string, name: string) {
    return (
      this.form.get(`${controlConfig}.${name}`).hasError('required') &&
      this.form.get(`${controlConfig}.${name}`).dirty
    );
  }

  onChangeMail(e: MatCheckboxChange) {
    this.postOffice = e.checked;
    this.form.patchValue({
      contactInfo: { byMailOnly: this.postOffice }
    });
  }

  selectCity(city: { name: string }) {
    this.form.patchValue({
      contactInfo: { contactCity: city.name }
    });
  }

  selectStreet(street: { name: string }) {
    this.form.patchValue({
      contactInfo: { contactStreet: street.name }
    });
  }

  selectedClient(e) {
    this.form.patchValue({
      contactInfo: {
        clientType: e.value
      }
    });
    this.isClientChecked = e === 'client';
    this.isContactChecked = e === 'contact';
  }

  selectedRelation(e) {
    this.form.patchValue({
      contactInfo: {
        contactRelation: e.source.value
      }
    });
  }

  handleGoTo(e) {

    if (e === 'forward') {
      this.form.get('basicInfo').statusChanges.subscribe(st => {
        const status = st === 'VALID'; // && !this.contactData ;
      });
      sessionStorage.setItem(`${this.section}`, JSON.stringify(this.form.value));
      this.router.navigate([`/${this.goToPage}`]);
    } else {
      this.form.get('basicInfo').statusChanges.subscribe(st => {
        const status = st === 'VALID'; // && !this.contactData ;
      });
      sessionStorage.setItem(`${this.section}`, JSON.stringify(this.form.value));
      this.router.navigate([`/${this.getBack}`]);
    }
  }

  backToSummary() {
    sessionStorage.setItem(`${this.section}`, JSON.stringify(this.form.value));
    this.router.navigate([`/summary`]);
  }
}
