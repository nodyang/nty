import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SetupComponent} from './pages/setup/setup.component';
import {RxjsDemoComponent} from './components/rxjs-demo/rxjs-demo.component';

const routes: Routes = [
  { path: 'setup', component: SetupComponent },
  { path: 'info', component: RxjsDemoComponent},
  { path: '', redirectTo: '/info', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
