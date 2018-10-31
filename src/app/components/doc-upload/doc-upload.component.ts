import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessengerService } from '../../services/messenger.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.scss']
})

export class DocUploadComponent implements OnInit, AfterViewInit {
  selectedFile: File = null;
  uploadedName: string;
  fileContainer: string | ArrayBuffer;
  reader = new FileReader();
  @ViewChild('fileToUpload') fileToUpload: ElementRef;

  form = this.fb.group({
    documents: this.fb.group({
      docType: ['', Validators.required],
      docName: ['', Validators.required],
    })
  });

  documents = [
    {id: '1', name: 'ויתור סודיות רפואית', uploaded: ''},
    {id: '2', name: 'אישור על בעלות חשבון בנק', uploaded: ''},
    {id: '3', name: 'אישור על מייצג', uploaded: ''},
    {id: '3', name: 'אישור המייצג על חשבון בנק', uploaded: ''}
  ];
  uploadSuccess: boolean;

  constructor(
    private messenger: MessengerService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient) { }

  ngOnInit() {
  }

  ngAfterViewInit(){}

  selectDocType(doc) {}


  fileUpload(file: File) {
    this.uploadedName = file.name;
    this.reader.onload = () => {
      this.fileContainer = this.reader.result;
      console.log('done');
      this.uploadSuccess = true;
    };
    this.reader.readAsArrayBuffer(file);

    /*
    Send to server via Http
    const formData:FormData = new FormData();

    formData.append('upload', file, file.name);
    this.http.post('https://file.io', file)
      .subscribe(event => {
        console.log('done');
        this.uploadSuccess = true;
      })
    */
  }
}
