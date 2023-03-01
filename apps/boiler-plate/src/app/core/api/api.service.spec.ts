import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {ApiModule} from './api.module';
import {ApiService} from './api.service';
import {NameId} from './models';

describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;
  const testUrl = '/test-data';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ApiModule],
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should invoke GET API method when get() is called', () => {
    const testData: NameId = new NameId({
      name: 'Test Data',
    });
    service.get(testUrl).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpController.expectOne(testUrl);

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('should invoke POST API method when post() is called', () => {
    const testData: NameId = new NameId({
      name: 'Test Data',
    });
    service.post(testUrl, testData).subscribe(data => {
      expect(data.id).toEqual(testData.id);
    });

    const req = httpController.expectOne(testUrl);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    testData.id = '1';
    req.flush(testData);
  });

  it('should invoke PATCH API method when patch() is called', () => {
    const testData: NameId = new NameId({
      name: 'Test Data New',
    });
    service.patch(`${testUrl}/1`, testData).subscribe(data => {
      expect(data.name).toEqual(testData.name);
    });

    const req = httpController.expectOne(`${testUrl}/1`);

    expect(req.request.method).toEqual('PATCH');

    req.flush(testData);
  });

  it('should invoke PUT API method when put() is called', () => {
    const testData: NameId = new NameId({
      name: 'Test Data New',
    });
    service.put(`${testUrl}/1`, testData).subscribe(data => {
      expect(data.name).toEqual(testData.name);
    });

    const req = httpController.expectOne(`${testUrl}/1`);

    expect(req.request.method).toEqual('PUT');

    req.flush(testData);
  });

  it('should invoke DELETE API method when delete() is called', () => {
    service.delete(`${testUrl}/1`).subscribe(data => {
      expect(data).toBeNull();
    });

    const req = httpController.expectOne(`${testUrl}/1`);

    expect(req.request.method).toEqual('DELETE');

    req.flush(null, {
      status: 204,
      statusText: 'No content',
    });
  });

  afterEach(() => {
    httpController.verify();
  });
});
