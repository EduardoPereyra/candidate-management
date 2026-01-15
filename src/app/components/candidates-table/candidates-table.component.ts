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
import { Candidate } from '../../interfaces/candidate';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CandidatesService } from '../../services/candidates.service';

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
  ],
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
    'years',
    'availability',
    'actions',
  ];
  dataSource: MatTableDataSource<Candidate> = new MatTableDataSource<Candidate>(
    []
  );
  editingCandidateId: number | null = null;

  candidateForm = new FormBuilder().group({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    seniority: new FormControl('', [Validators.required]),
    years: new FormControl(1, [
      Validators.required,
      Validators.min(0),
      Validators.max(80),
    ]),
    availability: new FormControl(true),
  });

  constructor(private candidatesService: CandidatesService) {}

  ngOnInit(): void {
    this.candidatesService.getCandidatesMock().subscribe((candidates) => {
      this.dataSource = new MatTableDataSource<Candidate>(candidates);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteCandidate(id: number) {
    this.dataSource.data = this.dataSource.data.filter(
      (candidate) => candidate.id !== id
    );
  }

  addCandidate() {
    if (this.candidateForm.valid) {
      const newCandidate: Candidate = {
        id:
          this.dataSource.data.length > 0
            ? Math.max(...this.dataSource.data.map((c) => c.id)) + 1
            : 1,
        name: this.candidateForm.value.name!,
        surname: this.candidateForm.value.surname!,
        seniority: this.candidateForm.value.seniority! as 'senior' | 'junior',
        years: this.candidateForm.value.years!,
        availability: this.candidateForm.value.availability!,
      };
      this.dataSource.data = [...this.dataSource.data, newCandidate];
      this.candidateForm.reset({ availability: true });
    }
  }

  editCandidate(candidate: Candidate) {
    this.editingCandidateId = candidate.id;
    this.candidateForm.setValue({
      name: candidate.name,
      surname: candidate.surname,
      seniority: candidate.seniority,
      years: candidate.years,
      availability: candidate.availability,
    });
  }

  saveEditCandidate() {
    if (this.candidateForm.valid && this.editingCandidateId !== null) {
      this.dataSource.data = this.dataSource.data.map((candidate) =>
        candidate.id === this.editingCandidateId
          ? {
              ...candidate,
              name: this.candidateForm.value.name!,
              surname: this.candidateForm.value.surname!,
              seniority: this.candidateForm.value.seniority! as
                | 'senior'
                | 'junior',
              years: this.candidateForm.value.years!,
              availability: this.candidateForm.value.availability!,
            }
          : candidate
      );
      this.cancelEditing();
    }
  }

  cancelEditing() {
    this.editingCandidateId = null;
    this.candidateForm.reset({ availability: true });
  }
}
