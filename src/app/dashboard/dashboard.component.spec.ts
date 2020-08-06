import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpacexService } from '../spacex.service';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [SpacexService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'filterYear').and.callThrough();
    spyOn(component, 'launchSuccess').and.callThrough();
    spyOn(component, 'landingSuccess').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have filters in it', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const sut = compiled.querySelector('.filters');
    expect(sut).toBeTruthy();
  });

  it('should be able to click on year filter btn', (done) => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const filterButton = compiled.querySelector('.filters .year-filters span') as HTMLElement;
    filterButton.click();
    fixture.whenStable().then(() => {
      expect(component.filterYear).toHaveBeenCalled();
      done();
    });
  });

  it('should be able to click on launch filter btn', (done) => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const filterButton = compiled.querySelector('.filters .launch-filters span') as HTMLElement;
    filterButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.launchSuccess).toHaveBeenCalled();
      done();
    });
  });

  it('should be able to click on landing filter btn', (done) => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const filterButton = compiled.querySelector('.filters .landing-filters span') as HTMLElement;
    filterButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.landingSuccess).toHaveBeenCalled();
      done();
    });
  });
});
