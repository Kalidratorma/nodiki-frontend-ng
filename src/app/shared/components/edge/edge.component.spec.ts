import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeComponent } from './edge.component';

describe('EdgeComponent', () => {
  let component: EdgeComponent;
  let fixture: ComponentFixture<EdgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
