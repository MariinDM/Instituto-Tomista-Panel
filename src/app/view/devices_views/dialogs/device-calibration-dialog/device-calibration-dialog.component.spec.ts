import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCalibrationDialogComponent } from './device-calibration-dialog.component';

describe('DeviceCalibrationDialogComponent', () => {
  let component: DeviceCalibrationDialogComponent;
  let fixture: ComponentFixture<DeviceCalibrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceCalibrationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCalibrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
