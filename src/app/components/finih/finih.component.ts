import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

// All this will be replaced with a proper service

@Component({
  selector: 'app-finih',
  templateUrl: './finih.component.html',
  styleUrls: ['./finih.component.scss']
})
// TYPO will be fixed
export class FinihComponent implements OnInit {

  sendAllData: any;
  collectTheData = false;
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

  totalData = [];


  constructor(private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {

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
      { name:'קיימת זכאות לסיעוד מגורם אחר:', content:eligibilityFromAnotherParty === 'yes' ? 'כן' : 'לא'},
      { name:'גורמי הזכאות:', content:entitlementFactors },
    ];
  }

  buildClientResidence(clientResidenceType, institutionAddress, institutionType, institutionName, foreignWorkerEmployment ){
    this.clientResidenceLines = [
      {description: 'client-residence', name:'היכן המבוטח שוהה:', content:clientResidenceType === 'home' ? 'בית' : ('institution' ? 'מוסד':'אחר')},
      { name:'כתובת הבית:', content:institutionAddress},
      { name:'סוג המוסד:', content:institutionType},
      { name:'שם המוסד:', content:institutionName},
      { name:'האם המבוטח מעסיק עובד זר?:',content:foreignWorkerEmployment === 'yes' ? 'כן' : 'לא' }
    ];
  }
  buildEventData(eventDate, cause, causeDetails, anotherPolicy,                 insuranceCompanyName){
    const d = new Date(eventDate);
    const bDay = this.datePipe.transform(d,'dd/MM/yyyy');
    this.eventDataLines = [
      { name:'תאריך האירוע:', content:bDay},
      { name:'גורם תביעה:', content:cause === 'illness' ? 'מחלה':'תאונה'},
      { name:'פירוט המחלה/תאונה:', content:causeDetails},
      { name:'קיימת פוליסה/זכאות בחברת ביטוח אחרת?:', content:anotherPolicy==='yes'?'כן':'לא' },
      { name:'שם החברה:', content:insuranceCompanyName}
    ];
  }
  buildContactComm (contactFirstName, contactLastName, contactEmail, contactRelation, byMailOnly, contactCity, contactStreet, contactHouseNumber, contactZipCode){
    this.connectionLines = [
      {name:'שם:', content:`${contactFirstName} ${contactLastName}`},
      { name:'מייל:', content:contactEmail},
      { name:'קרבה:', content: contactRelation === 'contact'?'איש קשר':('spouse' ? 'בן/בת זוג':'ילדים')},
      { name:'קבלת תכתובת רק באמצעות הדאר:', content:byMailOnly ? 'כן' :'לא'},
      { name:'עיר:', content:contactCity},
      { name:'רחוב:', content:`${contactStreet} ${contactHouseNumber}`},
      { name:'מיקוד:', content:contactZipCode}
    ];
  }

  buildBasicContactInfo(clientType, contactFirstName, contactLastName, contactIdNumber, contactCellPhone, contactRelation, contactRelationType){

    this.basicContactsLines = [
      { name:'איש קשר לתביעה', content: clientType === 'client' ? 'מבוטח':'איש קשר'},
      { name:'שם:', content:`${contactFirstName} ${contactLastName}`},
      { name:'ת.ז:', content: contactIdNumber},
      { name:'טלפון נייד:', content: contactCellPhone},
      { name:'קרבה:', content: contactRelation === 'contact'?'איש קשר':('spouse' ? 'בן/בת זוג':'ילדים')},
      { name:'סוג קרבה:', content: contactRelationType}
    ];
  }
  buildBasicInfo(birthday, firstName, hmo, idNumber, lastName){
    const d = new Date(birthday);
    const bDay = this.datePipe.transform(d,'dd/MM/yyyy');
    this.basicInfoLines = [
      { name:'שם מלא:', content:`${firstName} ${lastName}`},
      { name:'ת.ז:', content:idNumber},
      { name:'קופת חולים:', content:hmo},
      { name:'תאריך לידה:', content:bDay}
    ];
  }

  savePdf() {
    var j: number;
    var i: number;
    const prinBuffer=[];

    this.getTheData();
    this.totalData = [this.basicInfoLines, this.basicContactsLines,this.connectionLines, this.eventDataLines, this.clientResidenceLines, this.eligibilityKines];
    for (i = 0; i < this.totalData.length; i++) {
      for ( j = 0; j < this.totalData[i].length; j++) {
        prinBuffer.push(`${this.totalData[i][j].name}---------- ${this.totalData[i][j].content}`);
      }
    }
    console.table(prinBuffer);
  }
}
