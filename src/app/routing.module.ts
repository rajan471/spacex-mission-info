import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MissionCardComponent } from './mission-card/mission-card.component';
import { SpacexService } from './spacex.service';

const components = [
  DashboardComponent,
  MissionCardComponent
];

const routes: Route[] = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SpacexService],
  exports: [...components, RouterModule]
})
export class RoutingModule { }
