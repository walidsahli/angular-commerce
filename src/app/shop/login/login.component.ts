import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { loginForm } from 'src/shared/interfaces/loginForm';
import { ServicesService } from 'src/shared/services/services.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public isFormValid : boolean;
  public hide : boolean = true;
  private loginSubscription : Subscription;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private api : ServicesService,
    private snackBar : MatSnackBar,
    private formbuilder: FormBuilder) {
    this.createLoginForm();
    this.data.length > 0 ? 
      setTimeout(() => document.getElementById("login-password").focus(),10)
      :
      setTimeout(() => document.getElementById("login-username").focus(),10)

  }

  createLoginForm() {
    this.loginForm = this.formbuilder.group({
      username: [this.data, Validators.required],
      password:['', Validators.required]
    });
  }

  ngOnInit() {
    this.loginForm.statusChanges.subscribe(status => this.isFormValid = status == "VALID" ? true : false)
  }

  ngOnDestroy(){
    this.loginSubscription ? this.loginSubscription.unsubscribe() : null
  }

  closeLogin(){
    this.dialogRef.close()
  }

  login(){
    let credentials : loginForm = this.loginForm.value
    this.loginSubscription = this.api.Login(credentials).subscribe( response => {
      localStorage.setItem('token',response.token);
      this.api.loggedIn.next(true);
      this.dialogRef.close()
    }, (error : HttpErrorResponse) => {
      console.log(error)
      this.snackBar.open(error.error.message || error.statusText, "I got it :)", {
        duration : 5000,
        direction :"ltr",
        horizontalPosition : "start"
      })
    })
  }

}
