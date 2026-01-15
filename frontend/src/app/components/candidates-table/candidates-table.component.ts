import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Candidate, CandidateDTO } from '../../interfaces/candidate';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CandidatesService } from '../../services/candidates.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-candidates-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    HttpClientModule,
  ],
  providers: [CandidatesService],
  templateUrl: './candidates-table.component.html',
  styleUrl: './candidates-table.component.scss',
})
export class CandidatesTableComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator = {} as MatPaginator;
  displayedColumns: string[] = [
    'name',
    'surname',
    'seniority',
    'yearsOfExperience',
    'availability',
    'actions',
  ];
  dataSource: MatTableDataSource<Candidate> = new MatTableDataSource<Candidate>(
    []
  );
  editingCandidateId: number | null = null;
  candidateFile: File | null = null;

  candidateForm = new FormBuilder().group({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    seniority: new FormControl('', [Validators.required]),
    yearsOfExperience: new FormControl(1, [
      Validators.required,
      Validators.min(0),
      Validators.max(80),
    ]),
    availability: new FormControl(true),
  });
  candidateByFileForm = new FormBuilder().group({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    file: new FormControl(null, [Validators.required]),
  });

  constructor(private candidatesService: CandidatesService) {}

  ngOnInit(): void {
    this.candidatesService.getCandidates().subscribe((candidates) => {
      this.dataSource = new MatTableDataSource<Candidate>(candidates);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteCandidate(id: number) {
    this.candidatesService.deleteCandidate(id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(
          (candidate) => candidate.id !== id
        );
      },
      (error) => {
        console.error('Error deleting candidate:', error);
      }
    );
  }

  addCandidate() {
    if (this.candidateForm.valid) {
      const newCandidate: CandidateDTO = {
        name: this.candidateForm.value.name!,
        surname: this.candidateForm.value.surname!,
        seniority: this.candidateForm.value.seniority! as 'senior' | 'junior',
        yearsOfExperience: this.candidateForm.value.yearsOfExperience!,
        availability: this.candidateForm.value.availability!,
      };
      this.candidatesService
        .addCandidate(newCandidate)
        .subscribe((candidate) => {
          this.dataSource.data = [...this.dataSource.data, candidate];
          this.candidateForm.reset({ availability: true });
        });
      this.candidateForm.reset({ availability: true });
    }
  }

  addCandidateByFile() {
    if (this.candidateByFileForm.valid) {
      this.candidatesService
        .addCandidateWithFile(
          this.candidateByFileForm.value.name!,
          this.candidateByFileForm.value.surname!,
          this.candidateFile!
        )
        .subscribe((candidate) => {
          this.dataSource.data = [...this.dataSource.data, candidate];
          this.candidateByFileForm.reset();
        });
    }
  }

  editCandidate(candidate: Candidate) {
    this.editingCandidateId = candidate.id;
    this.candidateForm.setValue({
      name: candidate.name,
      surname: candidate.surname,
      seniority: candidate.seniority,
      yearsOfExperience: candidate.yearsOfExperience,
      availability: candidate.availability,
    });
  }

  saveEditCandidate() {
    if (this.candidateForm.valid && this.editingCandidateId !== null) {
      const updatedCandidate: CandidateDTO = {
        name: this.candidateForm.value.name!,
        surname: this.candidateForm.value.surname!,
        seniority: this.candidateForm.value.seniority! as 'senior' | 'junior',
        yearsOfExperience: this.candidateForm.value.yearsOfExperience!,
        availability: this.candidateForm.value.availability!,
      };

      this.candidatesService
        .updateCandidate(this.editingCandidateId, updatedCandidate)
        .subscribe(() => {
          this.dataSource.data = this.dataSource.data.map((candidate) =>
            candidate.id === this.editingCandidateId
              ? { ...candidate, ...updatedCandidate }
              : candidate
          );
          this.cancelEditing();
        });
    }
  }

  cancelEditing() {
    this.editingCandidateId = null;
    this.candidateForm.reset({ availability: true });
  }

  onFileSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    this.candidateFile = files ? files[0] : null;
  }
}
