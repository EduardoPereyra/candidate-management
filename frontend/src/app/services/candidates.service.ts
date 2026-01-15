import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate, CandidateDTO } from '../interfaces/candidate';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor(private http: HttpClient) {}

  public getCandidates(): Observable<Candidate[]> {
    const apiUrl = environment.apiUrl + '/candidates';
    return this.http.get<Candidate[]>(apiUrl);
  }

  public addCandidate(candidate: CandidateDTO): Observable<Candidate> {
    const apiUrl = environment.apiUrl + '/candidates';
    return this.http.post<Candidate>(apiUrl, candidate);
  }

  public updateCandidate(
    candidateId: number,
    candidate: CandidateDTO
  ): Observable<Candidate> {
    const apiUrl = `${environment.apiUrl}/candidates/${candidateId}`;
    return this.http.put<Candidate>(apiUrl, candidate);
  }

  public deleteCandidate(candidateId: number): Observable<void> {
    const apiUrl = `${environment.apiUrl}/candidates/${candidateId}`;
    return this.http.delete<void>(apiUrl);
  }
}
