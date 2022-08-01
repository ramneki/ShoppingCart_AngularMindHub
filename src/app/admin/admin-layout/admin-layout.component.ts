import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  isLessThenLargeDevice;
  userData: any = [];
  userId : any;

  @ViewChild('sidenav') sidenav;
  isSidenavExpand = false;
  constructor(
    private breakpointObserver: BreakpointObserver, 
    private router: Router,
    private userService: UserService) { }
    ngOnInit(): void {
      this.userId=parseInt(localStorage.getItem('mnd:uid'));
      this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
        this.isLessThenLargeDevice = matches;
      });
      this.getUserById(this.userId);
    }
    onLogout(): void {
      this.router.navigate(['auth/login']);
    }
  
    getUserById(id: any){
      //user id passed hard - coded; later could be taken from logged in user
      this.userService.getUserById(id).subscribe((data: any)=> {
        this.userData = data;
        console.log('User Dashboard Data', this.userData);
      })
    }
  
    toggleSidenav(): void {
      this.sidenav.toggle();
      this.isSidenavExpand = this.sidenav.opened;
    }
  }
  