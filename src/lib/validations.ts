
import * as z from "zod";

export const personalInfoSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  father_name: z.string().min(2, "Father's name is required"),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC format (XXXXX-XXXXXXX-X)"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  religion: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(10, "Address is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  photo_url: z.string().optional(),
});

export const academicInfoSchema = z.object({
  qualification: z.string().min(1, "Qualification is required"),
  board_institute: z.string().min(2, "Board/Institute name is required"),
  passing_year: z.coerce.number().min(2018, "Year must be 2018 or later"),
  total_marks: z.coerce.number().optional(),
  obtained_marks: z.coerce.number().min(0, "Invalid marks"),
  result_status: z.string().min(1, "Result status is required"),
  roll_number: z.string().min(1, "Roll number is required"),
  extra_activities: z.string().optional(),
});

export const programSchema = z.object({
  faculty: z.string().min(1, "Faculty is required"),
  program: z.string().min(1, "Program is required"),
  study_mode: z.string().min(1, "Study mode is required"),
  admission_type: z.string().min(1, "Admission type is required"),
  selected_subjects: z.array(z.string()).min(3, "Select at least 3 subjects"),
  emergency_contact_name: z.string().min(2, "Emergency contact name is required"),
  emergency_contact_phone: z.string().min(10, "Emergency contact phone is required"),
});

export const declarationSchema = z.object({
  signature_name: z.string().min(2, "Typed signature is required"),
  signature_date: z.string().min(1, "Date is required"),
  declaration_agreed: z.boolean().refine((val) => val === true, "You must agree to the declaration"),
  confirm_info: z.boolean().refine((val) => val === true, "You must confirm information accuracy"),
  confirm_original: z.boolean().refine((val) => val === true, "You must confirm original documents availability"),
});

export const admissionFormSchema = z.object({
  personal: personalInfoSchema,
  academic: academicInfoSchema,
  program: programSchema,
  declaration: declarationSchema,
});

export type AdmissionFormData = z.infer<typeof admissionFormSchema>;
