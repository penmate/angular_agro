import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signupRequestPayload: SignupRequestPayload;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { 
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)

    });
    this.signupRequestPayload = {
      username: '',
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;
    this.signupRequestPayload.firstname = this.signupForm.get('firstname')?.value;
    this.signupRequestPayload.lastname = this.signupForm.get('lastname')?.value;
    this.signupRequestPayload.phone = this.signupForm.get('phone')?.value;
    
    this.authService.signup(this.signupRequestPayload)
    .subscribe(data => {
      this.router.navigate(['/login'],
        { queryParams: { registered: 'true' } });
    }, error => {
      console.log(error);
      this.toastr.error('Registration Failed! Please try again');
    });
  }

}
