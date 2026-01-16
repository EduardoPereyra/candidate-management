import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { Candidate, CandidateDTO } from '../interfaces/candidate';
import { CandidatesService } from './candidates.service';

describe('CandidatesService', () => {
  let service: CandidatesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidatesService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CandidatesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch candidates', () => {
    const dummyCandidates: Candidate[] = [
      {
        id: 1,
        name: 'John',
        surname: 'Doe',
        seniority: 'senior',
        yearsOfExperience: 0,
        availability: false,
      },
      {
        id: 2,
        name: 'Jane',
        surname: 'Doe',
        seniority: 'senior',
        yearsOfExperience: 0,
        availability: false,
      },
    ];

    service.getCandidates().subscribe((candidates) => {
      expect(candidates.length).toBe(2);
      expect(candidates).toEqual(dummyCandidates);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/candidates`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCandidates);
  });

  it('should add a candidate', () => {
    const newCandidate: CandidateDTO = {
      name: 'John',
      surname: 'Doe',
      seniority: 'senior',
      yearsOfExperience: 0,
      availability: false,
    };
    const addedCandidate: Candidate = { id: 1, ...newCandidate };

    service.addCandidate(newCandidate).subscribe((candidate) => {
      expect(candidate).toEqual(addedCandidate);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/candidates`);
    expect(req.request.method).toBe('POST');
    req.flush(addedCandidate);
  });

  it('should update a candidate', () => {
    const candidateId = 1;
    const updatedCandidate: CandidateDTO = {
      name: 'John',
      surname: 'Smith',
      seniority: 'senior',
      yearsOfExperience: 0,
      availability: false,
    };
    const expectedCandidate: Candidate = {
      id: candidateId,
      ...updatedCandidate,
    };

    service
      .updateCandidate(candidateId, updatedCandidate)
      .subscribe((candidate) => {
        expect(candidate).toEqual(expectedCandidate);
      });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/candidates/${candidateId}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(expectedCandidate);
  });

  it('should delete a candidate', () => {
    const candidateId = 1;

    service.deleteCandidate(candidateId).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/candidates/${candidateId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should add a candidate with file', () => {
    const name = 'John';
    const surname = 'Doe';
    const file = new File([''], 'test.xlsx');
    const addedCandidate: Candidate = {
      id: 1,
      name,
      surname,
      seniority: 'senior',
      yearsOfExperience: 0,
      availability: false,
    };

    service.addCandidateWithFile(name, surname, file).subscribe((candidate) => {
      expect(candidate).toEqual(addedCandidate);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/candidates/upload`);
    expect(req.request.method).toBe('POST');
    req.flush(addedCandidate);
  });
});
