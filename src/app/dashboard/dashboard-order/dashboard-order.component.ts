import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.scss']
})
export class DashboardOrderComponent implements OnInit {
  public orderDetails: any;

  constructor() {}

  ngOnInit(): void {
  }

}
