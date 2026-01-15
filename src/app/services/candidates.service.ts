import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Candidate } from '../interfaces/candidate';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor() {}

  getCandidatesMock(): Observable<Candidate[]> {
    return of([
      {
        id: 1,
        name: 'Belva',
        surname: 'Salomon',
        seniority: 'senior',
        years: 11,
        availability: true,
      },
      {
        id: 2,
        name: 'Jobyna',
        surname: 'Budding',
        seniority: 'senior',
        years: 1,
        availability: false,
      },
      {
        id: 3,
        name: 'Averyl',
        surname: 'Napoleone',
        seniority: 'senior',
        years: 15,
        availability: false,
      },
      {
        id: 4,
        name: 'Melitta',
        surname: 'Heaffey',
        seniority: 'junior',
        years: 1,
        availability: false,
      },
      {
        id: 5,
        name: 'Ursala',
        surname: 'Agates',
        seniority: 'junior',
        years: 3,
        availability: true,
      },
      {
        id: 6,
        name: 'Wandie',
        surname: 'Kayes',
        seniority: 'junior',
        years: 7,
        availability: false,
      },
      {
        id: 7,
        name: 'Witty',
        surname: 'Pennini',
        seniority: 'senior',
        years: 9,
        availability: true,
      },
      {
        id: 8,
        name: 'Jeramie',
        surname: 'Bakesef',
        seniority: 'senior',
        years: 14,
        availability: true,
      },
      {
        id: 9,
        name: 'Amandie',
        surname: 'Humphery',
        seniority: 'senior',
        years: 8,
        availability: false,
      },
      {
        id: 10,
        name: 'Hope',
        surname: 'Keuning',
        seniority: 'junior',
        years: 4,
        availability: true,
      },
    ]);
  }
}
