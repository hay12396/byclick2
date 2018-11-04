import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  section = 'summary';
  goToPage = 'finish';
  getBack  = 'summary';
  dataStorage = ['personal-data', 'event-details', 'doc-uploads'];
  dataStored = [];
  basicInfo;
  contactInfo;
  eventData;

  basicInfoHeader = 'פרטי המבוטח';
  basicInfoLines = [];
  basicContactHeader = 'פרטי איש הקשר';
  basicContactsLines= [];
  connectionHeader = 'פרטי ההתקשרות';
  connectionLines= [];
  eventDataHeader = 'פרטי האירוע';
  eventDataLines = [];

  clientResidence = 'שהיית המבוטח';
  clientResidenceLines = [];

  eligibilityHeader = 'זכאות מגורם אחר';
  eligibilityKines = [];

  constructor(private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getTheData();
  }
  getTheData(){
    let store;
    for (store in this.dataStorage){
      this.dataStored.push(JSON.parse(sessionStorage.getItem(`${this.dataStorage[store]}`)));
    }
    this.buildBasicInfo(
      this.dataStored[0].basicInfo.birthday,
      this.dataStored[0].basicInfo.firstName,
      this.dataStored[0].basicInfo.hmo,
      this.dataStored[0].basicInfo.idNumber,
      this.dataStored[0].basicInfo.lastName);

    this.buildBasicContactInfo(
      this.dataStored[0].contactInfo.clientType,
      this.dataStored[0].contactInfo.contactFirstName,
      this.dataStored[0].contactInfo.contactLastName,
      this.dataStored[0].contactInfo.contactIdNumber,
      this.dataStored[0].contactInfo.contactCellPhone,
      this.dataStored[0].contactInfo.contactRelation,
      this.dataStored[0].contactInfo.contactRelationType
    );
    this.buildContactComm(
      this.dataStored[0].contactInfo.contactFirstName,
      this.dataStored[0].contactInfo.contactLastName,
      this.dataStored[0].contactInfo.contactEmail,
      this.dataStored[0].contactInfo.contactRelation,
      this.dataStored[0].contactInfo.byMailOnly,
      this.dataStored[0].contactInfo.contactCity,
      this.dataStored[0].contactInfo.contactStreet,
      this.dataStored[0].contactInfo.contactHouseNumber,
      this.dataStored[0].contactInfo.contactZipCode
    );
    this.buildEventData(
      this.dataStored[1].eventData.eventDate,
      this.dataStored[1].eventData.cause,
      this.dataStored[1].eventData.causeDetails,
      this.dataStored[1].eventData.anotherPolicy,
      this.dataStored[1].eventData.insuranceCompanyName
    );
    this.buildClientResidence(
      this.dataStored[1].eventData.clientResidenceType,
      this.dataStored[1].eventData.institutionAddress,
      this.dataStored[1].eventData.institutionType,
      this.dataStored[1].eventData.institutionName,
      this.dataStored[1].eventData.foreignWorkerEmployment,
    );
    this.buildEligibility(
      this.dataStored[1].eventData.eligibilityFromAnotherParty,
      this.dataStored[1].eventData.entitlementFactors
    );
  }

  buildEligibility(eligibilityFromAnotherParty, entitlementFactors){
    this.eligibilityKines = [
      {description: 'eligible', name:'קיימת זכאות לסיעוד מגורם אחר:', content:eligibilityFromAnotherParty === 'yes' ? 'כן' : 'לא'},
      {description: 'factors', name:'גורמי הזכאות:', content:entitlementFactors },
    ];
  }

  buildClientResidence(clientResidenceType, institutionAddress, institutionType, institutionName, foreignWorkerEmployment ){
    this.clientResidenceLines = [
      {description: 'client-residence', name:'היכן המבוטח שוהה:', content:clientResidenceType === 'home' ? 'בית' : ('institution' ? 'מוסד':'אחר')},
      {description: 'address', name:'כתובת הבית:', content:institutionAddress},
      {description: 'institution-type', name:'סוג המוסד:', content:institutionType},
      {description: 'institution-name', name:'שם המוסד:', content:institutionName},
      {description: 'inst-name', name:'האם המבוטח מעסיק עובד זר?:',content:foreignWorkerEmployment === 'yes' ? 'כן' : 'לא' }
    ];
  }
  buildEventData(eventDate, cause, causeDetails, anotherPolicy,                 insuranceCompanyName){
    const d = new Date(eventDate);
    const bDay = this.datePipe.transform(d,'dd/MM/yyyy');
    this.eventDataLines = [
      {description: 'eventData', name:'תאריך האירוע:', content:bDay},
      {description: 'cause', name:'גורם תביעה:', content:cause === 'illness' ? 'מחלה':'תאונה'},
      {description: 'cause-details', name:'פירוט המחלה/תאונה:', content:causeDetails},
      {description: 'another-policy', name:'קיימת פוליסה/זכאות בחברת ביטוח אחרת?:', content:anotherPolicy==='yes'?'כן':'לא' },
      {description: 'another-policy', name:'שם החברה:', content:insuranceCompanyName}
    ];
  }
  buildContactComm (contactFirstName, contactLastName, contactEmail, contactRelation, byMailOnly, contactCity, contactStreet, contactHouseNumber, contactZipCode){
    this.connectionLines = [
      {description: 'full-name', name:'שם:', content:`${contactFirstName} ${contactLastName}`},
      {description: 'email', name:'מייל:', content:contactEmail},
      {description: 'relation', name:'קרבה:', content: contactRelation === 'contact'?'איש קשר':('spouse' ? 'בן/בת זוג':'ילדים')},
      {description: 'bu-mail-only', name:'קבלת תכתובת רק באמצעות הדאר:', content:byMailOnly ? 'כן' :'לא'},
      {description: 'city', name:'עיר:', content:contactCity},
      {description: 'street', name:'רחוב:', content:`${contactStreet} ${contactHouseNumber}`},
      {description: 'zip', name:'מיקוד:', content:contactZipCode}
    ];
  }

  buildBasicContactInfo(clientType, contactFirstName, contactLastName, contactIdNumber, contactCellPhone, contactRelation, contactRelationType){

    this.basicContactsLines = [
      {description: 'contact-type', name:'איש קשר לתביעה', content: clientType === 'client' ? 'מבוטח':'איש קשר'},
      {description: 'full-name', name:'שם:', content:`${contactFirstName} ${contactLastName}`},
      {description: 'cell-phone', name:'ת.ז:', content: contactIdNumber},
      {description: 'cell-phone', name:'טלפון נייד:', content: contactCellPhone},
      {description: 'relation', name:'קרבה:', content: contactRelation === 'contact'?'איש קשר':('spouse' ? 'בן/בת זוג':'ילדים')},
      {description: 'relation-type', name:'סוג קרבה:', content: contactRelationType}
    ];
  }
  buildBasicInfo(birthday, firstName, hmo, idNumber, lastName){
    const d = new Date(birthday);
    const bDay = this.datePipe.transform(d,'dd/MM/yyyy');
    this.basicInfoLines = [
      {description: 'full-name', name:'שם מלא:', content:`${firstName} ${lastName}`},
      {description: 'id', name:'ת.ז:', content:idNumber},
      {description: 'hmo', name:'קופת חולים:', content:hmo},
      {description: 'birthday', name:'תאריך לידה:', content:bDay}
    ];
  }

  handleGoTo(e) {
    if (e === 'forward'){
      this.router.navigate([`/${this.goToPage}`]);
    } else {
      this.router.navigate([`/${this.getBack}`]);
    }
  }

}
