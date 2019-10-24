import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';


export interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: string;
  group: string;
  description: Date;

}

/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'birthDate', 'basicSalary', 'status', 'group', 'description', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  employeForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog

  ) {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  createform() {
    this.employeForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthDate: ['', Validators.required],
      basicSalary: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
      actions: ['', Validators.required],


    });
  }

  ngOnInit() {
    this.createform();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showDetails(row) {
    const data = row;
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: { key: 'view', data: data },
      width: '500px',
      height: '800px',
    });
    // console.log(row);

  }
  editItem(row) {
    const data = row;
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: { key: 'edit', data: data },
      width: '500px',
      height: '800px',
    });
    console.log(row);
  }
  deleteItem(row) {
    console.log(row);
    let r = confirm("Are you sure to delete this data ? ");
    if (r == true) {
      alert('data has been deleted');
    } 
  }
  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  openDialog() {
    let dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
      height: '800px',
      // data: 'save'
      data: { key: 'save' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {

  const username =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))]
  const firstname =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  const lastname =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
  const email =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
  const birthDate = new Date("2015-03-25");

  const basicSalary = 20000
  const status = 'tetap'
  const group = 'it division';
  const description = '12 dec 2013'


  return {
    username: username,
    firstName: firstname,
    lastName: lastname,
    email: email,
    birthDate: new Date("2015-03-25"),
    basicSalary: Math.round(Math.random() * 100),
    status: 'asdasd',
    group: 'asd',
    description: new Date("2015-03-25"),

    // id: id.toString(),
    // name: name,
    // progress: Math.round(Math.random() * 100).toString(),
    // color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]

  };


}





