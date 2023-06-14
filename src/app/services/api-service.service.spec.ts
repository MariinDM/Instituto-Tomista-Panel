import { TestBed } from '@angular/core/testing';

import { ApiServiceService } from './api-service.service';
import { HttpClient } from '@angular/common/http';

fdescribe('ApiServiceService', () => {
  let service: ApiServiceService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(ApiServiceService);
  // });

  beforeEach(() => {
    const httpClientMock = jasmine.createSpyObj('HttpClient', ['get', 'post']); // Crear un espía para HttpClient
    service = new ApiServiceService(httpClientMock as HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
