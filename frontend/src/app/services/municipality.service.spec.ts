import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Municipality } from '../models/municipality';

import { MunicipalityService } from './municipality.service';

describe('MunicipalityService', () => {
  let service: MunicipalityService;
  let ROOT_URL = 'http://localhost:3000';
  let httpMock : HttpTestingController;
  let municipalitiesMockup = new Municipality();
  municipalitiesMockup = {_id: "123", municipalityName: "Umeå", schools: [{_id: "1", schoolName: "Dragonskolan", _menuId: "2"}]};
  let municipalityId = municipalitiesMockup._id;
  let schoolId = municipalitiesMockup.schools[0]._id;
  let school = municipalitiesMockup.schools[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MunicipalityService]
    });
    service = TestBed.inject(MunicipalityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve municipalities from API via GET', ()=> {
    service.getMunicipalities().subscribe(municipalities => {
      expect(municipalities).toEqual(municipalitiesMockup);
    });
    const request = httpMock.expectOne(`${ROOT_URL}/public/municipality`);
    expect(request.request.method).toBe('GET');
    request.flush(municipalitiesMockup);
})

it('should update schools from API via PATCH', ()=> {
  service.updateSchool(municipalityId, school).subscribe(municipalities => {
    expect(municipalities).toEqual(municipalitiesMockup);
  });
  const request = httpMock.expectOne(`${ROOT_URL}/private/municipality/${municipalityId}/school/${schoolId}`);
  expect(request.request.method).toBe('PATCH');
  request.flush(municipalitiesMockup);
})
});
