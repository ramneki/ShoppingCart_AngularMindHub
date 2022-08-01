import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.scss']
})
export class AdminIndexComponent implements OnInit {
  latestOrders : any = [];
  userId: any = 1; //to be taken from local storge
  constructor() { }

  ngOnInit(): void {
  }

}
