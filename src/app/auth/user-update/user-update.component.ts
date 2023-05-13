import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserResponse } from 'src/app/shared/model/user.response';
import { UserUpdateRequest } from './user-update-request.payload';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  updateForm: FormGroup;
  user?: UserResponse;
  userUpdateRequest: UserUpdateRequest = {};


  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { 
    this.updateForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
    this.authService.getUser(this.authService.getUserName()).subscribe(data => {
      this.userUpdateRequest.email = data.email;
      this.userUpdateRequest.firstname = data.firstname;
      this.userUpdateRequest.lastname = data.lastname;
      this.userUpdateRequest.phone = data.phone;

      this.updateForm.setValue(this.userUpdateRequest);
      this.userUpdateRequest.userId = data.userId;
      this.userUpdateRequest.username = data.username;
      console.log(this.userUpdateRequest)
    });
    
  }

  ngOnInit(): void {
  }

  update() {
    this.userUpdateRequest.email = this.updateForm.get('email')?.value;
    this.userUpdateRequest.firstname = this.updateForm.get('firstname')?.value;
    this.userUpdateRequest.lastname = this.updateForm.get('lastname')?.value;
    this.userUpdateRequest.phone = this.updateForm.get('phone')?.value;

    this.authService.update(this.userUpdateRequest).subscribe(data => {

      this.router.navigateByUrl('');
      this.toastr.success('Update Successful');
    }, error => {
      this.toastr.error('Update Failed!');
    });;
  }

}
