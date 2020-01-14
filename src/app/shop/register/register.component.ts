import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { registerForm } from 'src/shared/interfaces/registerForm';
import { ServicesService } from 'src/shared/services/services.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup;
  public isFormValid: boolean;
  public hidecomfirm: boolean = true;
  public hidepass: boolean = true;
  private registrationSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private formbuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private api: ServicesService) {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formbuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', Validators.required],
      comfirmpassword: ['', Validators.required],
      phoneNumber: [null, [Validators.required, Validators.pattern("^[0-9]{8}$")]],
      location: ['']
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    console.log(this.registerForm.controls.comfirmpassword)
    this.registerForm.statusChanges.subscribe(status => this.isFormValid = status == 'VALID' ? true : false)
  }
  ngOnDestroy() {
    if (this.registrationSubscription)
      this.registrationSubscription.unsubscribe();
  }

  closeRegister() {
    this.dialogRef.close({success : false})
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('comfirmpassword').value;
    if (password !== confirmPassword) {
      control.get('comfirmpassword').setErrors({ NoPassswordMatch: true });
    }
  }


  register() {
    delete this.registerForm.value["comfirmpassword"];
    const registerForm = this.registerForm.value;
    const form: registerForm = registerForm;
    this.registrationSubscription = this.api.Register(form).subscribe(response => {
      this.snackBar.open(response.message, "Thank's", {
        duration: 5000
      }).afterDismissed().subscribe(() => {
        console.log("hné")
        setTimeout(() =>  this.dialogRef.close({success : true, username : this.registerForm.controls['username'].value}) , 5)
      })
    }, (error: HttpErrorResponse) => {
      if (error.status == 409) {
        this.snackBar.open("Email or username already in use", "OK", {
          duration: 4000
        })
      } else {
        this.snackBar.open("Server Error", "OK", {
          duration: 4000
        })
      }
    })
  }
}
