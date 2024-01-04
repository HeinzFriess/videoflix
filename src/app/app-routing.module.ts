import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './content/landingpage/landingpage.component';
import { MainpageComponent } from './content/mainpage/mainpage.component';
import { AuthGuard } from 'services/AuthGuard'; 


const routes: Routes = [
  {path: '', component: LandingpageComponent},
  { path: 'main', component: MainpageComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


