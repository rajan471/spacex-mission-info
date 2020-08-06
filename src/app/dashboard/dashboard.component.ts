import { Component, OnInit } from '@angular/core';
import { UrlSerializer, Router, ActivatedRoute } from '@angular/router';
import { SpacexService } from '../spacex.service';
import { Mission } from '../mission';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = true;
  filterYears = [];
  queryFilter: any = null;
  selectedYear = null;
  successfulLaunch: string = null;
  successfulLanding: string = null;
  apiMessage = '';
  missions: Mission[] = [];
  constructor(
    private spacexService: SpacexService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serializer: UrlSerializer
  ) {
    const currentYear = (new Date()).getFullYear();
    for (let i = 2006; i <= currentYear; i++) {
      this.filterYears.push('' + i);
    }
    this.activatedRoute.queryParamMap.subscribe((data: any) => { console.log(data.params); });
    this.activatedRoute.queryParams.subscribe((query) => {
      this.queryFilter = Object.assign({ limit: '100' }, query);
      this.selectedYear = this.queryFilter.launch_year || null;
      this.successfulLaunch = this.queryFilter.launch_success || null;
      this.successfulLanding = this.queryFilter.land_success || null;
      this.fetchMissions();
    });
  }
  ngOnInit(): void {
  }

  landingSuccess(value: string): void {
    this.successfulLanding = this.successfulLanding === value ? null : value;
    this.updateRoute();
  }
  launchSuccess(value: string): void {
    this.successfulLaunch = this.successfulLaunch === value ? null : value;
    this.updateRoute();
  }
  filterYear(year): void {
    this.selectedYear = this.selectedYear === year ? null : year;
    this.updateRoute();
  }
  trackByMissionName(index, mission: Mission): string {
    return mission.missionName;
  }
  updateRoute(): void {
    this.queryFilter.launch_success = this.successfulLaunch;
    this.queryFilter.land_success = this.successfulLanding;
    this.queryFilter.launch_year = this.selectedYear;

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: this.queryFilter,
        queryParamsHandling: 'merge'
      });
  }
  fetchMissions(): void {
    this.loading = true;
    this.apiMessage = '';
    const queryStr = this.serializer.serialize(this.router.createUrlTree([], { queryParams: this.queryFilter }));

    this.spacexService.getMissions(queryStr).subscribe((response: any) => {
      if (response.length === 0) {
        this.apiMessage = 'No missions found!';
      }
      this.missions = response.map((data) => {
        return {
          missionName: data.mission_name,
          flightNumber: data.flight_number,
          missionImage: data.links.mission_patch_small || 'https://via.placeholder.com/223',
          missionIds: data.mission_id,
          launchYear: data.launch_year,
          launchSuccess: data.launch_success,
          landingSuccess: data.rocket?.first_stage?.cores[0]?.land_success
        };
      });
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.apiMessage = 'Something went wrong. Please try after some time';
    });
  }
}
