import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private data : Array<any> = ["T-Shirt with red neck for winter all sizes","Basket","Casquette"];

  constructor() { }

  ngOnInit() {
  }

}
