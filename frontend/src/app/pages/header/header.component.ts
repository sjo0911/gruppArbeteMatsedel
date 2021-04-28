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

  constructor(private municipalityService: MunicipalityService, private router: Router) { }

  ngOnInit(): void {

    this.municipalityService.getMunicipalities().subscribe((municipalities: any[]) => {
      this.municipalities = municipalities;
    })
  }



}
