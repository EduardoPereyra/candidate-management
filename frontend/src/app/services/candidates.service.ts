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
        yearsOfExperience: 11,
        availability: true,
      },
      {
        id: 2,
        name: 'Jobyna',
        surname: 'Budding',
        seniority: 'senior',
        yearsOfExperience: 1,
        availability: false,
      },
      {
        id: 3,
        name: 'Averyl',
        surname: 'Napoleone',
        seniority: 'senior',
        yearsOfExperience: 15,
        availability: false,
      },
      {
        id: 4,
        name: 'Melitta',
        surname: 'Heaffey',
        seniority: 'junior',
        yearsOfExperience: 1,
        availability: false,
      },
      {
        id: 5,
        name: 'Ursala',
        surname: 'Agates',
        seniority: 'junior',
        yearsOfExperience: 3,
        availability: true,
      },
      {
        id: 6,
        name: 'Wandie',
        surname: 'Kayes',
        seniority: 'junior',
        yearsOfExperience: 7,
        availability: false,
      },
      {
        id: 7,
        name: 'Witty',
        surname: 'Pennini',
        seniority: 'senior',
        yearsOfExperience: 9,
        availability: true,
      },
      {
        id: 8,
        name: 'Jeramie',
        surname: 'Bakesef',
        seniority: 'senior',
        yearsOfExperience: 14,
        availability: true,
      },
      {
        id: 9,
        name: 'Amandie',
        surname: 'Humphery',
        seniority: 'senior',
        yearsOfExperience: 8,
        availability: false,
      },
      {
        id: 10,
        name: 'Hope',
        surname: 'Keuning',
        seniority: 'junior',
        yearsOfExperience: 4,
        availability: true,
      },
    ]);
  }
}
