import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMobilesComponent } from './buy-mobiles.component';

describe('BuyMobilesComponent', () => {
  let component: BuyMobilesComponent;
  let fixture: ComponentFixture<BuyMobilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyMobilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMobilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
