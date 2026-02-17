
export type TemplateType = 'formal' | 'modern' | 'academic' | 'minimalist';

export interface AssignmentData {
  university: string;
  name: string;
  rollNo: string;
  subject: string;
  topic: string;
  submissionDate: string;
  program: string;
  semester: string;
  professor: string;
  showLogo: boolean;
  customLogo?: string;
}

export interface TemplateProps {
  data: AssignmentData;
}
