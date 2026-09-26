export interface APSamplePaper {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  year: string;
  pdfUrl: string; // Base64 Data URL or remote URL
  fileName: string;
  fileSize: string;
  uploadedAt: number;
  uploadedBy?: string;
  description?: string;
  totalMarks?: number;
  durationMinutes?: number;
}
