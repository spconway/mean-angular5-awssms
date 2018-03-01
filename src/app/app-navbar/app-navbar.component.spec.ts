import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavbarComponent } from './app-navbar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: 'app-navbar.component.html',
  styles: []
})

describe('AppNavbarComponent', () => {
  let component: AppNavbarComponent;
  let fixture: ComponentFixture<AppNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
