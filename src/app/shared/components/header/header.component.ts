import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { menuList as staticMenuList } from '../../data/menus';

@Component({
  selector: 'll-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() topFixed: boolean;
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean;
  menuList = [];
  isLessThenLargeDevice;
  username:string;
  constructor(private breakpointObserver: BreakpointObserver,
    private router:Router) {}

  ngOnInit(): void {
    debugger
    this.username=localStorage.getItem('mnd:uname');
    this.menuList = staticMenuList;
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
     
    });
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isScrolled = window.pageYOffset > 15;
  }
  onLogout(): void {
   
    localStorage.setItem('mnd:uid', "");
    localStorage.setItem('mnd:actkn', "");
    localStorage.setItem('mnd:uname', "");
     localStorage.setItem('mnd:phone',"");
      localStorage.setItem('mnd:isActive', "");
      this.username=null;
     // window.location.reload();
    this.router.navigate(['/']);
  }
}
