import { Injectable } from '@angular/core';
import { WebReqService } from './web-req.service';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  constructor(private webReqService: WebReqService) { }

  getMunicipalities() {
    return this.webReqService.get('municipality');
  }
}
