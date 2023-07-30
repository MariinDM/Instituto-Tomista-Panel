import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEvaluationsComponent } from './dialog-evaluations.component';

describe('DialogEvaluationsComponent', () => {
  let component: DialogEvaluationsComponent;
  let fixture: ComponentFixture<DialogEvaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEvaluationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
