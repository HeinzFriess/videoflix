import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './content/landingpage/landingpage.component';
import { MainpageComponent } from './content/mainpage/mainpage.component';
import { AuthGuard } from 'services/AuthGuard'; 
import { ImprintComponent } from './content/imprint/imprint.component';
import { PrivacyPolicyComponent } from './content/privacy-policy/privacy-policy.component';


const routes: Routes = [
  { path: '', component: LandingpageComponent},
  { path: 'mainpage', component: MainpageComponent, canActivate: [AuthGuard] },
  { path: 'imprint', component: ImprintComponent},
  { path: 'privacypolicy', component: PrivacyPolicyComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


