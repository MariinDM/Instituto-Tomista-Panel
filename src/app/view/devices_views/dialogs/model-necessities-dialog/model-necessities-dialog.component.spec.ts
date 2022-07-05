import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelNecessitiesDialogComponent } from './model-necessities-dialog.component';

describe('ModelNecessitiesDialogComponent', () => {
  let component: ModelNecessitiesDialogComponent;
  let fixture: ComponentFixture<ModelNecessitiesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelNecessitiesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelNecessitiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
