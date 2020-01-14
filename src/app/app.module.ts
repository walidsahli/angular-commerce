import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shop/home/home.component';
import { NavbarComponent } from './shop/navbar/navbar.component';
import { FiltersComponent } from './shop/filters/filters.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './shop/components/product/product.component';
import { BadgeComponent } from './shop/components/badge/badge.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { LoginComponent } from './shop/login/login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './shop/register/register.component';
import { ServicesService } from 'src/shared/services/services.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FiltersComponent,
    ShopComponent,
    ProductComponent,
    BadgeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent],
  entryComponents:[LoginComponent,RegisterComponent]
})
export class AppModule { }
