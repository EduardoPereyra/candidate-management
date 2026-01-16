import { of } from 'rxjs';
import { Candidate, CandidateDTO } from '../../interfaces/candidate';
import { CandidatesService } from '../../services/candidates.service';
import { CandidatesTableComponent } from './candidates-table.component';

describe('CandidatesTableComponent', () => {
  let component: CandidatesTableComponent;
  let candidatesService: CandidatesService;
  let mockCandidates: Candidate[];

  beforeEach(() => {
    candidatesService = new CandidatesService(null as any); // Mock service
    component = new CandidatesTableComponent(candidatesService);
    mockCandidates = [
      {
        id: 1,
        name: 'John',
        surname: 'Doe',
        seniority: 'senior',
        yearsOfExperience: 5,
        availability: true,
      },
      {
        id: 2,
        name: 'Jane',
        surname: 'Smith',
        seniority: 'junior',
        yearsOfExperience: 2,
        availability: false,
      },
    ];
    component.dataSource.data = mockCandidates;
  });

  it('should fetch candidates on init', () => {
    jest
      .spyOn(candidatesService, 'getCandidates')
      .mockReturnValue(of(mockCandidates));
    component.ngOnInit();
    expect(component.dataSource.data).toEqual(mockCandidates);
  });

  it('should delete a candidate', () => {
    jest.spyOn(candidatesService, 'deleteCandidate').mockReturnValue(of());
    component.localDelete(1);
    expect(component.dataSource.data).toHaveLength(1);
    expect(component.dataSource.data[0].id).toBe(2);
  });

  it('should add a candidate', () => {
    const newCandidate: CandidateDTO = {
      name: 'Alice',
      surname: 'Johnson',
      seniority: 'junior',
      yearsOfExperience: 3,
      availability: true,
    };
    jest
      .spyOn(candidatesService, 'addCandidate')
      .mockReturnValue(of({ id: 3, ...newCandidate }));
    component.candidateForm.setValue(newCandidate);
    component.addCandidate();
    expect(component.dataSource.data).toHaveLength(3);
  });

  it('should edit a candidate', () => {
    component.editCandidate(mockCandidates[0]);
    expect(component.editingCandidateId).toBe(1);
    expect(component.candidateForm.value).toEqual({
      name: 'John',
      surname: 'Doe',
      seniority: 'senior',
      yearsOfExperience: 5,
      availability: true,
    });
  });

  it('should save edited candidate', () => {
    const updatedCandidate: CandidateDTO = {
      name: 'John',
      surname: 'Doe',
      seniority: 'senior',
      yearsOfExperience: 6,
      availability: true,
    };
    jest
      .spyOn(candidatesService, 'updateCandidate')
      .mockReturnValue(of({} as Candidate));
    component.editingCandidateId = 1;
    component.candidateForm.setValue(updatedCandidate);
    component.saveEditCandidate();
    expect(component.dataSource.data[0].yearsOfExperience).toBe(6);
  });

  it('should handle file selection', () => {
    const file = new File([''], 'test-file.txt');
    const event = { target: { files: [file] } } as unknown as Event;
    component.onFileSelected(event);
    expect(component.candidateFile).toBe(file);
  });
});
