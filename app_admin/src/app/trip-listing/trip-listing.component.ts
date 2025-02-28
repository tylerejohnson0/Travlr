import { Component } from '@angular/core';
import { trips } from '../data/trips';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  providers: [TripDataService],
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})


export class TripListingComponent {
  trips: Array<any> = trips;
  message: string = '';

  constructor(private tripDataService: TripDataService, private router: Router) {
    console.log('trip-listing constructor');
  }

  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          if(value.length > 0)
          {
            this.message = 'There are ' + value.length + ' trips available.';
          }
          else
          {
          this.message = 'There were no trips retireved from thedatabase';
          }
          console.log(this.message);
          },
          error: (error: any) => {
          console.log('Error: ' + error);
          }
      })
    }

    public addTrip(): void {
      this.router.navigate(['/add-trip']);
    }
    
    ngOnInit(): void {
      console.log('ngOnInit');
      this.getStuff();
      }

}
