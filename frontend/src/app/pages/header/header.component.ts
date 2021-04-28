import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MunicipalityService } from 'src/app/services/municipality.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  // Skapa interface för municipality istället för any[]
  municipalities: any[];
  chosenMunicipality: any;
  municipalityTitle: string;

  constructor(private municipalityService: MunicipalityService, private router: Router) {
    this.municipalityTitle ="Kommun"
  }

  ngOnInit(): void {

    this.municipalityService.getMunicipalities().subscribe((municipalities: any[]) => {
      this.municipalities = municipalities;
    })
  }

  chooseMunicipality(municipality: any) {
    this.chosenMunicipality = municipality;
    this.municipalityTitle = this.chosenMunicipality.municipalityName;
  }

}
