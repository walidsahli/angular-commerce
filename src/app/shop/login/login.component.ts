import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { loginForm } from 'src/shared/interfaces/loginForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isFormValid : boolean;
  public hide : boolean = true;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
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

  closeLogin(){
    this.dialogRef.close()
  }

  login(){
    let credentials : loginForm = this.loginForm.value
    console.log(credentials)
  }

}
