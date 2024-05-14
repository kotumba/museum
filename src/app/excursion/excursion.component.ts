import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Excursion } from '../museum';
import { Subscription } from 'rxjs';
import { ExcursionService } from '../excursion.service';

@Component({
  selector: 'app-excursion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excursion.component.html',
  styleUrl: './excursion.component.css'
})
export class ExcursionComponent implements OnInit{
  @Input() museumId: number | undefined;
  excursions: Excursion[] = [];
  private subscription: Subscription | undefined;
  constructor(private excursionService: ExcursionService) {}

  ngOnInit(): void {
    if (this.museumId) {
      this.subscription = this.excursionService
        .getAvailableExcursionForMuseum(this.museumId)
        .subscribe(
          (excursions) => {
            this.excursions = excursions;
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }
}
