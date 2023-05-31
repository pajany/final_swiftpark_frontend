import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { disputeFormService } from './file-a-dispute.service';
@Component({
  selector: 'app-file-a-dispute',
  templateUrl: './file-a-dispute.component.html',
  styleUrls: ['./file-a-dispute.component.scss']
})
export class FileADisputeComponent implements OnInit {
  disputeForm: FormGroup;
  Licenseno:any;
  plateno:any;
  alphaNumeric = /^[a-z0-9]+$/i;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    public appservice: disputeFormService,
    public route: Router
  ) {}

  submitted = false;
  ngOnInit(): void {
    this.disputeForm = this.formBuilder.group({
      plateNumber: ['', Validators.required],
      ticketNumber: ['', Validators.required],
      issueDate: ['', Validators.required],
      addressIsue: ['', Validators.required],
      permitNo: ['', Validators.required],
      dateObtained: ['', Validators.required]
    });
  }
  get f() {
    return this.disputeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.spinner.show();
    if (!this.disputeForm.invalid) {
      this.appservice.submitForm(this.disputeForm.value).subscribe(
        (data: any) => {
          this.spinner.hide();
          this.route.navigate(['/success-dispute']);
        },
        error => {
          console.error(error);
          this.spinner.hide();
        }
      );
    } else {
      this.spinner.hide();
    }
  }

  keyPressAlphaNumericWithCharacters(event) {

    var inp = String.fromCharCode(event.keyCode);
   
    // Allow numbers, alpahbets, space, underscore
    if (/[a-z0-9]/.test(inp)) {
       //return true;
       this.Licenseno ='';
       return this.Licenseno;
    } else {
      event.preventDefault();
      this.Licenseno ="don't allow space or dashes";
      return this.Licenseno;
    }
  }

  keyPressAlphaNumericWithPlate(event) {

    var inp = String.fromCharCode(event.keyCode);
   
    // Allow numbers, alpahbets, space, underscore
    if (/[a-z0-9]/.test(inp)) {
       //return true;
       this.plateno ='';
       return this.plateno;
    } else {
      event.preventDefault();
      this.plateno ="don't allow space or dashes";
      return this.plateno;
    }
  }
  
}
