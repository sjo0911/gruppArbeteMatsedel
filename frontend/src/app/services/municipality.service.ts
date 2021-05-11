import { Injectable } from '@angular/core';
import { School } from '../models/school';
import { WebReqService } from './web-req.service';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  constructor(private webReqService: WebReqService) { }

  getMunicipalities() {
    return this.webReqService.get('municipality');
  }

  updateSchool(municipalityId : string, school : School) {
    return this.webReqService.patch(`municipality/${municipalityId}/school/${school._id}`, school);
  }
}
