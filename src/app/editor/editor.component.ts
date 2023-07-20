import { Component, Inject, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {


  tinyMceInit: any;
  employeForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
  ) {


    this.tinyMceInit = {
      base_url: '/tinymce',
      suffix: '.min',
      height: 500,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help'
    }
  }

  ngOnInit() {
  }

  name = "Angular " + VERSION.major;
  html = `Enter text here : <textarea></textarea> <p></p>`;
  document: HTMLDocument;


  addTextBox() {
    // let content = this.handleSelection();

    this.html += `<textarea name='text'></textarea>`;
    //console.log(content);
  }

  handleSelection(e) {
    const currentSelectedText: string = window.getSelection().toString();
    console.log({
      selected: currentSelectedText
    });
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
      description: ['', Validators.required]
    });
  }

}
