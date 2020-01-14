import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private Dialog : MatDialog ) {
    window.onscroll = () => {
      if (window.scrollY > 50) {
        document.getElementById("navbar").style.height = "50px";
        document.getElementById("login").style.visibility = "visible"
        document.getElementById("login").style.opacity = "1"
        document.getElementById("register").style.visibility = "visible"
        document.getElementById("register").style.opacity = "1"
      } else {
        document.getElementById("navbar").style.height = "100px";
        document.getElementById("login").style.visibility = "hidden"
        document.getElementById("login").style.opacity = "0"
        document.getElementById("register").style.visibility = "hidden"
        document.getElementById("register").style.opacity = "0"
      }
    }
  }

  openLogin(username : string = ''): void {
    const dialogRef = this.Dialog.open(LoginComponent, {
      width: '50wv',
      data: username,
      disableClose : true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openRegister(): void {
    const dialogRef = this.Dialog.open(RegisterComponent, {
      width: '50wv'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.success){
        this.openLogin(result.username)
      }
    });
  }

  ngOnInit() {
  }

}
