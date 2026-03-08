
export type ApplicantStatus = 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';

export interface Applicant {
  id: string;
  application_id: string;
  created_at: string;
  status: ApplicantStatus;
  first_name: string;
  last_name: string;
  father_name: string;
  cnic: string;
  date_of_birth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  photo_url?: string;
  qualification: string;
  board_institute: string;
  passing_year: number;
  total_marks?: number;
  obtained_marks: number;
  percentage?: number;
  faculty: string;
  program: string;
  study_mode: string;
  admission_type: string;
  selected_subjects: string[];
  remarks?: string;
}

export interface StaffUser {
  id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'reviewer' | 'data_entry';
  department?: string;
  is_active: boolean;
}

export interface Document {
  id: string;
  document_type: string;
  file_url: string;
  file_name: string;
  status: string;
}

export interface ApplicationStats {
  total: number;
  today: number;
  underReview: number;
  accepted: number;
  rejected: number;
  byProgram: { name: string; value: number }[];
  byStatus: { name: string; value: number }[];
}
