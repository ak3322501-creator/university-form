
-- Enums
CREATE TYPE applicant_status AS ENUM ('draft', 'submitted', 'under_review', 'accepted', 'rejected', 'waitlisted');
CREATE TYPE staff_role AS ENUM ('admin', 'reviewer', 'data_entry');

-- Applicants Table
CREATE TABLE applicants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    status applicant_status DEFAULT 'submitted',
    
    -- Personal Info
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    father_name TEXT NOT NULL,
    cnic TEXT UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL,
    religion TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    province TEXT,
    photo_url TEXT,
    
    -- Academic Info
    qualification TEXT NOT NULL,
    board_institute TEXT NOT NULL,
    passing_year INT NOT NULL,
    total_marks INT,
    obtained_marks INT NOT NULL,
    percentage NUMERIC(5,2),
    result_status TEXT,
    roll_number TEXT,
    extra_activities TEXT,
    
    -- Program Info
    faculty TEXT NOT NULL,
    program TEXT NOT NULL,
    study_mode TEXT,
    admission_type TEXT,
    selected_subjects TEXT[],
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    
    -- Declaration
    signature_name TEXT NOT NULL,
    signature_date DATE NOT NULL,
    declaration_agreed BOOLEAN DEFAULT false
);

-- Documents Table
CREATE TABLE applicant_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    applicant_id UUID REFERENCES applicants(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size INT,
    uploaded_at TIMESTAMPTZ DEFAULT now(),
    status TEXT DEFAULT 'uploaded'
);

-- Staff Users Table (linked to auth.users)
CREATE TABLE staff_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role staff_role DEFAULT 'reviewer',
    department TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Application Reviews Table
CREATE TABLE application_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    applicant_id UUID REFERENCES applicants(id) ON DELETE CASCADE,
    reviewed_by UUID REFERENCES staff_users(id),
    review_date TIMESTAMPTZ DEFAULT now(),
    decision TEXT NOT NULL,
    remarks TEXT,
    merit_score NUMERIC(5,2)
);

-- Audit Logs Table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    action TEXT NOT NULL,
    changed_by UUID REFERENCES auth.users(id),
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE applicant_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Applicants (Public insert, then access via App ID/CNIC logic in API)
CREATE POLICY "Enable public application submission" ON applicants FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow staff to read all applications" ON applicants FOR SELECT USING (EXISTS (SELECT 1 FROM staff_users WHERE id = auth.uid() AND is_active = true));
CREATE POLICY "Allow staff to update all applications" ON applicants FOR UPDATE USING (EXISTS (SELECT 1 FROM staff_users WHERE id = auth.uid() AND is_active = true));

-- Applicant Documents
CREATE POLICY "Enable public document upload" ON applicant_documents FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow staff to read documents" ON applicant_documents FOR SELECT USING (EXISTS (SELECT 1 FROM staff_users WHERE id = auth.uid() AND is_active = true));

-- Staff Users
CREATE POLICY "Allow staff to read staff list" ON staff_users FOR SELECT USING (EXISTS (SELECT 1 FROM staff_users WHERE id = auth.uid()));
CREATE POLICY "Allow admins to manage staff" ON staff_users FOR ALL USING (EXISTS (SELECT 1 FROM staff_users WHERE id = auth.uid() AND role = 'admin'));

-- Reviews
CREATE POLICY "Allow staff to read reviews" ON application_reviews FOR SELECT USING (EXISTS (SELECT 1 FROM staff_users WHERE id = auth.uid()));
CREATE POLICY "Allow staff to create reviews" ON application_reviews FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM staff_users WHERE id = auth.uid()));

-- Indexes
CREATE INDEX idx_applicants_application_id ON applicants(application_id);
CREATE INDEX idx_applicants_cnic ON applicants(cnic);
CREATE INDEX idx_applicants_status ON applicants(status);
CREATE INDEX idx_documents_applicant_id ON applicant_documents(applicant_id);
CREATE INDEX idx_reviews_applicant_id ON application_reviews(applicant_id);
