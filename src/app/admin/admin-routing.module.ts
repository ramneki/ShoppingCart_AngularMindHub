import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddbookComponent } from './admin-addbook/admin-addbook.component';
import { AdminBooklistComponent } from './admin-booklist/admin-booklist.component';
import { AdminEditbookComponent } from './admin-editbook/admin-editbook.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminUsermanagementComponent } from './admin-usermanagement/admin-usermanagement.component';

const AdminChildrenRoute:Routes=[
  {
    path:'',
    pathMatch:'full',
    component:AdminIndexComponent
},

{
  path:'UserManagement',
  component:AdminUsermanagementComponent
},
{
  path:'AddBook',
  component:AdminAddbookComponent
},
{
  path:'BookList',
  component:AdminBooklistComponent
},
{
  path:':id',
  component:AdminEditbookComponent
}
];


const routes: Routes = [
  {
    path:'',
    component:AdminLayoutComponent,
    children:AdminChildrenRoute
  }

];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
