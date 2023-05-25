import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(

    private router: Router,

  ) { }

  login: boolean = true;
  register: boolean;
  loginForm: FormGroup;

  ngOnInit() {

    this.createForm();
  }
  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }
  actionButton() {
    this.router.navigate(['/userdetails']);

  }
  test(status) {
    if (status === 'login') {
      this.login = true;
      this.register = false;

    } else {

      this.login = false;
      this.register = true;
      console.log(this.register);
    }
  }
  loginFunct() {
    const payload = {
      username: this.loginForm.getRawValue().username,
      password: this.loginForm.getRawValue().password
    };
    if (payload.username === 'admin' && payload.password === 'password') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('username or password wrong !!!');
    }




    // this.authService.login(payload).subscribe(
    //   (data:any) => {
    //     console.log(data);
    //     if(data.status === 200) {
    //       if(data.user.length > 0) {
    //         this.router.navigate(['/glossary/home']);

    //       }
    //       else {
    //         alert('username or password wrong !!!');
    //       }
    //     }
    //     // localStorage.setItem('Token', this.jwt.localStorageEncryt(data));
    //     // this.router.navigate(['/glossary/home']);
    //     // this.session.start();
    //   }
    // );
    //this.router.navigate(['dashboard']);
  }

}
