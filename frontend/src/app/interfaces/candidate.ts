import { Seniority } from './enum/seniority';

export interface Candidate {
  id: number;
  name: string;
  surname: string;
  seniority: 'senior' | 'junior'; //Seniority;
  yearsOfExperience: number;
  availability: boolean;
}
