import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ServicesService } from 'src/shared/services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private loggedIn: boolean;

  constructor(private Dialog: MatDialog,
    private api: ServicesService,
    private router: Router) {
    window.onscroll = () => {
      if (window.scrollY > 50) {
        document.getElementById("navbar").style.height = "50px";
      } else {
        document.getElementById("navbar").style.height = "100px";
      }
    }
  }
  ngOnInit() {
    this.api.loggedIn.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn
    });
  }

  openLogin(username: string = ''): void {
    const dialogRef = this.Dialog.open(LoginComponent, {
      width: '50wv',
      data: username,
      disableClose: true
    });
  }

  openRegister(): void {
    const dialogRef = this.Dialog.open(RegisterComponent, {
      width: '50wv'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.openLogin(result.username)
      }
    });
  }

  logout() {
    localStorage.clear();
    this.api.loggedIn.next(false)
  }

  goToCart() {
    try {
      this.router.navigateByUrl('/cart')
    } catch (error) {
      console.log(error)
    }
  }

}
