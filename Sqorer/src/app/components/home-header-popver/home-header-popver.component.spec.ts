import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeHeaderPopverComponent } from './home-header-popver.component';

describe('HomeHeaderPopverComponent', () => {
  let component: HomeHeaderPopverComponent;
  let fixture: ComponentFixture<HomeHeaderPopverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHeaderPopverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeHeaderPopverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
