import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  employeForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.createform();
    const row = this.data.data;
    if (this.data.data) {
      console.log('data', this.data);
      this.employeForm.patchValue({
        userName: row.username,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        birthDate: new Date(row.birthDate),
        basicSalary: row.basicSalary,
        status: row.status,
        group: row.group,
        description: new Date(row.description),
        // commented redesign for gl

      });
      this.markFormGroupTouched(this.employeForm);
      this.employeForm.updateValueAndValidity();
    }

  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  save() {
    this.dialogRef.close();
  }
  createform() {
    this.employeForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthDate: ['', Validators.required],
      basicSalary: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],


    });

  }


}