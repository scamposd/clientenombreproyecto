import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes =[
  {
    path:'',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
   path:'',
   component:TabsPage,
   children:[
     {
       path: 'home',
       loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
     
     }
   ]
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
