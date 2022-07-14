import { Component, OnInit } from '@angular/core';
import { productsDB } from 'src/app/shared/data/products';
import { OrdersService } from 'src/app/services/orders.service';
import { Router,ActivatedRoute } from '@angular/router';
import { WishListItem } from 'src/app/shared/data/WishListItem';

@Component({
  selector: 'll-dashboard-saved-item',
  templateUrl: './dashboard-saved-item.component.html',
  styleUrls: ['./dashboard-saved-item.component.scss']
})
export class DashboardSavedItemComponent implements OnInit {
  userId:any;
  view = 'list';
  wishListItem:WishListItem[];
  products;
  constructor(private ordersService:OrdersService,private activateRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.userId=localStorage.getItem('mnd:uid');
    this.products = productsDB.Product;
    this.getWishListItem();
  }
  getWishListItem(){
    debugger;
    const apiUrl:string=`Orders/GetWishListItem?userid=${this.userId}`;

    this.ordersService.getWishListItem(apiUrl).subscribe((data: any)=> {
      this.wishListItem = data;
      console.log('wishListItem', this.wishListItem);
    })
  }
}
