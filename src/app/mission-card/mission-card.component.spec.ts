import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionCardComponent } from './mission-card.component';
import { Component } from '@angular/core';

describe('MissionCardComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MissionCardComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('host should create', () => {
    expect(testHostComponent).toBeTruthy();
  });
  it('should have mission-name', (done) => {
    testHostComponent = testHostFixture.componentInstance;
    testHostComponent.updateMission();
    testHostFixture.detectChanges();
    console.log(testHostFixture.nativeElement);
    const title = testHostFixture.nativeElement.querySelector('.mission .mission-title');
    expect(title).toBeTruthy();
    done();
  });
  @Component({
    selector: `app-host-component`,
    template: `<app-mission-card [mission]='mission'></app-mission-card>`
  })
  class TestHostComponent {
    mission = {};
    updateMission(): void {
      this.mission = {
        launchYear: '2006',
        missionName: 'missionName',
        flightNumber: 'flightNumber',
        missionIds: [],
        missionImage: 'https://via.placeholder.com/223',
        landingSuccess: 'Yes',
        launchSuccess: 'No'
      };

    }
  }
});
