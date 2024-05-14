import { Component, OnInit } from '@angular/core';
import { Excursion, Museum } from '../museum';
import { MuseumService } from '../museum.service';
import { CommonModule } from '@angular/common';
import { ExcursionComponent } from '../excursion/excursion.component';
import { ExcursionService } from '../excursion.service';

@Component({
  selector: 'app-museum',
  standalone: true,
  imports: [CommonModule, ExcursionComponent],
  templateUrl: './museum.component.html',
  styleUrl: './museum.component.css'
})
export class MuseumComponent implements OnInit {
  museums: Museum[] = [];
  selectedMuseum: Museum | undefined;
  excursions: Excursion[] = [];

  constructor(
    private museumService: MuseumService,
    private excursionService: ExcursionService
  ) {}

  ngOnInit(): void {
    this.getMuseums();
  }

  getMuseums(): void {
    this.museumService
      .getAllMuseums()
      .subscribe((museums) => (this.museums = museums));
  }

  showExcursionsForMuseum(museumId: number): void {
    this.selectedMuseum = this.museums.find((museum) => museum.id === museumId);
    this.excursionService
      .getAvailableExcursionForMuseum(museumId)
      .subscribe((excursions) => (this.excursions = excursions));
  }
}
