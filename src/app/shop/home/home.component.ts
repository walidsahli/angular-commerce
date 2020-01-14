import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private data : Array<Number> = [1,2,4,6,8,551,151,98,151,3220,158,1684,132,8844,51335,4852,485,69,63,54,85,74,775,5520,58];

  constructor() { }

  ngOnInit() {
  }

}
