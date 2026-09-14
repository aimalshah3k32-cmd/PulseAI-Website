USE [AI project];
GO

-- Clean up any existing foreign keys and tables
DECLARE @sql NVARCHAR(MAX) = N'';
SELECT @sql += N'ALTER TABLE ' + QUOTENAME(s.name) + N'.' + QUOTENAME(t.name) + 
               N' DROP CONSTRAINT ' + QUOTENAME(f.name) + N';' + CHAR(13)
FROM sys.foreign_keys f
JOIN sys.tables t ON f.parent_object_id = t.object_id
JOIN sys.schemas s ON t.schema_id = s.schema_id;
EXEC sp_executesql @sql;

-- Drop all old tables if exist
IF OBJECT_ID('dbo.audit_logs', 'U') IS NOT NULL DROP TABLE dbo.audit_logs;
IF OBJECT_ID('dbo.payments', 'U') IS NOT NULL DROP TABLE dbo.payments;
IF OBJECT_ID('dbo.ai_analyses', 'U') IS NOT NULL DROP TABLE dbo.ai_analyses;
IF OBJECT_ID('dbo.media_proofs', 'U') IS NOT NULL DROP TABLE dbo.media_proofs;
IF OBJECT_ID('dbo.submissions', 'U') IS NOT NULL DROP TABLE dbo.submissions;
IF OBJECT_ID('dbo.assignments', 'U') IS NOT NULL DROP TABLE dbo.assignments;
IF OBJECT_ID('dbo.tasks', 'U') IS NOT NULL DROP TABLE dbo.tasks;
IF OBJECT_ID('dbo.questionnaires', 'U') IS NOT NULL DROP TABLE dbo.questionnaires;
IF OBJECT_ID('dbo.locations', 'U') IS NOT NULL DROP TABLE dbo.locations;
IF OBJECT_ID('dbo.projects', 'U') IS NOT NULL DROP TABLE dbo.projects;
IF OBJECT_ID('dbo.shopper_profiles', 'U') IS NOT NULL DROP TABLE dbo.shopper_profiles;
IF OBJECT_ID('dbo.users', 'U') IS NOT NULL DROP TABLE dbo.users;
IF OBJECT_ID('dbo.organizations', 'U') IS NOT NULL DROP TABLE dbo.organizations;
GO

-- 1. Create USERS Table
CREATE TABLE dbo.users (
    id NVARCHAR(36) PRIMARY KEY,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    full_name NVARCHAR(255) NOT NULL,
    phone NVARCHAR(50) NULL,
    role NVARCHAR(50) NOT NULL DEFAULT 'shopper', -- 'client', 'shopper', 'qc_admin', 'super_admin'
    avatar_url NVARCHAR(500) NULL,
    is_verified BIT NOT NULL DEFAULT 1,
    status NVARCHAR(50) NOT NULL DEFAULT 'active',
    created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- 2. Create CLIENT_PROFILES Table (Client Registration)
IF OBJECT_ID('dbo.client_profiles', 'U') IS NOT NULL DROP TABLE dbo.client_profiles;
CREATE TABLE dbo.client_profiles (
    id NVARCHAR(36) PRIMARY KEY,
    user_id NVARCHAR(36) NOT NULL UNIQUE,
    company_name NVARCHAR(255) NOT NULL,
    industry NVARCHAR(100) NULL DEFAULT 'Retail & Consumer',
    service_needed NVARCHAR(255) NULL DEFAULT 'Mystery Shopping & CX Evaluation',
    store_count NVARCHAR(50) NULL DEFAULT '10-50 stores',
    city NVARCHAR(100) NULL DEFAULT 'Dubai, UAE',
    country NVARCHAR(100) NULL DEFAULT 'Global',
    designation NVARCHAR(100) NULL DEFAULT 'Enterprise Executive',
    billing_address NVARCHAR(MAX) NULL,
    tax_id NVARCHAR(100) NULL,
    total_spent FLOAT NOT NULL DEFAULT 0.0,
    created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_client_profiles_users FOREIGN KEY (user_id) REFERENCES dbo.users(id) ON DELETE CASCADE
);
GO

-- 3. Create SHOPPER_PROFILES Table (Shopper Registration)
IF OBJECT_ID('dbo.shopper_profiles', 'U') IS NOT NULL DROP TABLE dbo.shopper_profiles;
CREATE TABLE dbo.shopper_profiles (
    id NVARCHAR(36) PRIMARY KEY,
    user_id NVARCHAR(36) NOT NULL UNIQUE,
    city NVARCHAR(100) NULL DEFAULT 'Dubai, UAE',
    country NVARCHAR(100) NULL DEFAULT 'United Arab Emirates',
    gender NVARCHAR(50) NULL DEFAULT 'Unspecified',
    dob NVARCHAR(50) NULL,
    payout_method NVARCHAR(100) NULL DEFAULT 'Direct Bank Transfer / IBAN',
    payout_account_details NVARCHAR(255) NULL,
    current_lat FLOAT NULL,
    current_lng FLOAT NULL,
    trust_score FLOAT NOT NULL DEFAULT 95.0,
    is_available BIT NOT NULL DEFAULT 1,
    kyc_status NVARCHAR(50) NOT NULL DEFAULT 'verified',
    kyc_id_type NVARCHAR(100) NULL DEFAULT 'National ID',
    completed_audits_count INT NOT NULL DEFAULT 0,
    balance_earned FLOAT NOT NULL DEFAULT 0.0,
    balance_pending FLOAT NOT NULL DEFAULT 0.0,
    balance_withdrawn FLOAT NOT NULL DEFAULT 0.0,
    transport_mode NVARCHAR(50) NULL DEFAULT 'Car',
    created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_shopper_profiles_users FOREIGN KEY (user_id) REFERENCES dbo.users(id) ON DELETE CASCADE
);
GO

-- 4. Create PROJECTS Table
IF OBJECT_ID('dbo.projects', 'U') IS NOT NULL DROP TABLE dbo.projects;
CREATE TABLE dbo.projects (
    id NVARCHAR(36) PRIMARY KEY,
    client_id NVARCHAR(36) NOT NULL,
    title NVARCHAR(255) NOT NULL,
    raw_brief NVARCHAR(MAX) NULL,
    project_type NVARCHAR(100) NOT NULL DEFAULT 'retail_audit', -- 'retail_audit', 'mystery_shopping', 'ai_data'
    status NVARCHAR(50) NOT NULL DEFAULT 'active',
    payout_per_task FLOAT NOT NULL DEFAULT 25.0,
    target_quota INT NOT NULL DEFAULT 50,
    completed_quota INT NOT NULL DEFAULT 0,
    instructions NVARCHAR(MAX) NULL,
    start_date DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    end_date DATETIME2 NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_projects_client_profiles FOREIGN KEY (client_id) REFERENCES dbo.client_profiles(id)
);
GO

-- 5. Create LOCATIONS Table (Geofenced Store Branches)
IF OBJECT_ID('dbo.locations', 'U') IS NOT NULL DROP TABLE dbo.locations;
CREATE TABLE dbo.locations (
    id NVARCHAR(36) PRIMARY KEY,
    project_id NVARCHAR(36) NOT NULL,
    store_name NVARCHAR(255) NOT NULL,
    branch_code NVARCHAR(100) NULL,
    address NVARCHAR(255) NOT NULL,
    city NVARCHAR(100) NOT NULL,
    country NVARCHAR(100) NOT NULL DEFAULT 'United Arab Emirates',
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    geofence_radius_meters FLOAT NOT NULL DEFAULT 150.0,
    status NVARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed'
    created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_locations_projects FOREIGN KEY (project_id) REFERENCES dbo.projects(id) ON DELETE CASCADE
);
GO

-- 6. Create QUESTIONNAIRES Table
IF OBJECT_ID('dbo.questionnaires', 'U') IS NOT NULL DROP TABLE dbo.questionnaires;
CREATE TABLE dbo.questionnaires (
    id NVARCHAR(36) PRIMARY KEY,
    project_id NVARCHAR(36) NOT NULL,
    title NVARCHAR(255) NULL DEFAULT 'Audit Inspection Checklist',
    schema_json NVARCHAR(MAX) NOT NULL, -- JSON Schema of questionnaire questions
    generated_by_ai NVARCHAR(50) NOT NULL DEFAULT 'true',
    version INT NOT NULL DEFAULT 1,
    created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_questionnaires_projects FOREIGN KEY (project_id) REFERENCES dbo.projects(id) ON DELETE CASCADE
);
GO

-- 7. Create ASSIGNMENTS Table (Mission Dispatches)
IF OBJECT_ID('dbo.assignments', 'U') IS NOT NULL DROP TABLE dbo.assignments;
CREATE TABLE dbo.assignments (
    id NVARCHAR(36) PRIMARY KEY,
    project_id NVARCHAR(36) NOT NULL,
    location_id NVARCHAR(36) NOT NULL,
    shopper_id NVARCHAR(36) NULL,
    status NVARCHAR(50) NOT NULL DEFAULT 'available', -- 'available', 'assigned', 'submitted', 'approved', 'rejected', 'escalated'
    payout_amount FLOAT NOT NULL DEFAULT 25.0,
    assigned_at DATETIME2 NULL,
    expires_at DATETIME2 NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_assignments_projects FOREIGN KEY (project_id) REFERENCES dbo.projects(id),
    CONSTRAINT FK_assignments_locations FOREIGN KEY (location_id) REFERENCES dbo.locations(id),
    CONSTRAINT FK_assignments_shoppers FOREIGN KEY (shopper_id) REFERENCES dbo.shopper_profiles(id)
);
GO

-- 8. Create SUBMISSIONS Table (Shopper Evidence)
IF OBJECT_ID('dbo.submissions', 'U') IS NOT NULL DROP TABLE dbo.submissions;
CREATE TABLE dbo.submissions (
    id NVARCHAR(36) PRIMARY KEY,
    assignment_id NVARCHAR(36) NOT NULL UNIQUE,
    answers_data NVARCHAR(MAX) NOT NULL, -- JSON key-value answers
    submission_lat FLOAT NOT NULL,
    submission_lng FLOAT NOT NULL,
    geo_distance_meters FLOAT NOT NULL DEFAULT 0.0,
    is_geofence_valid BIT NOT NULL DEFAULT 1,
    submitted_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_submissions_assignments FOREIGN KEY (assignment_id) REFERENCES dbo.assignments(id) ON DELETE CASCADE
);
GO

-- 9. Create MEDIA_PROOFS Table (Photos, Videos, Audio, Receipts)
IF OBJECT_ID('dbo.media_proofs', 'U') IS NOT NULL DROP TABLE dbo.media_proofs;
CREATE TABLE dbo.media_proofs (
    id NVARCHAR(36) PRIMARY KEY,
    submission_id NVARCHAR(36) NOT NULL,
    media_type NVARCHAR(50) NOT NULL, -- 'shelf_image', 'receipt_image', 'audio_recording', 'video_clip'
    storage_url NVARCHAR(500) NOT NULL,
    file_hash NVARCHAR(64) NULL, -- SHA256 / MD5 hash
    exif_timestamp DATETIME2 NULL,
    exif_gps_lat FLOAT NULL,
    exif_gps_lng FLOAT NULL,
    is_verified BIT NOT NULL DEFAULT 1,
    created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_media_proofs_submissions FOREIGN KEY (submission_id) REFERENCES dbo.submissions(id) ON DELETE CASCADE
);
GO

-- 10. Create AI_ANALYSES Table (Computer Vision & Quality Engine)
IF OBJECT_ID('dbo.ai_analyses', 'U') IS NOT NULL DROP TABLE dbo.ai_analyses;
CREATE TABLE dbo.ai_analyses (
    id NVARCHAR(36) PRIMARY KEY,
    submission_id NVARCHAR(36) NOT NULL UNIQUE,
    vision_scores NVARCHAR(MAX) NOT NULL, -- JSON planogram compliance, bounding boxes
    text_sentiment_score FLOAT NOT NULL DEFAULT 0.0,
    transcription_text NVARCHAR(MAX) NULL,
    fraud_flags NVARCHAR(MAX) NOT NULL, -- JSON fraud detection flags
    overall_quality_score FLOAT NOT NULL DEFAULT 90.0,
    status NVARCHAR(50) NOT NULL DEFAULT 'auto_approved', -- 'auto_approved', 'escalated', 'qc_rejected', 'qc_approved'
    ai_feedback_summary NVARCHAR(MAX) NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_ai_analyses_submissions FOREIGN KEY (submission_id) REFERENCES dbo.submissions(id) ON DELETE CASCADE
);
GO

-- 11. Create PAYMENTS Table (Escrow & Payout Ledger)
IF OBJECT_ID('dbo.payments', 'U') IS NOT NULL DROP TABLE dbo.payments;
CREATE TABLE dbo.payments (
    id NVARCHAR(36) PRIMARY KEY,
    user_id NVARCHAR(36) NOT NULL,
    assignment_id NVARCHAR(36) NULL UNIQUE,
    amount FLOAT NOT NULL,
    currency NVARCHAR(10) NOT NULL DEFAULT 'USD',
    payment_type NVARCHAR(50) NOT NULL DEFAULT 'shopper_payout', -- 'shopper_payout', 'client_deposit', 'refund'
    status NVARCHAR(50) NOT NULL DEFAULT 'escrowed', -- 'escrowed', 'released', 'completed', 'refunded'
    payout_method NVARCHAR(50) NOT NULL DEFAULT 'bank_wire',
    transaction_ref NVARCHAR(100) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_payments_users FOREIGN KEY (user_id) REFERENCES dbo.users(id),
    CONSTRAINT FK_payments_assignments FOREIGN KEY (assignment_id) REFERENCES dbo.assignments(id)
);
GO

-- 12. Create AUDIT_LOGS Table (Security & Enterprise Audit Trail)
IF OBJECT_ID('dbo.audit_logs', 'U') IS NOT NULL DROP TABLE dbo.audit_logs;
CREATE TABLE dbo.audit_logs (
    id NVARCHAR(36) PRIMARY KEY,
    event_type NVARCHAR(100) NOT NULL,
    user_id NVARCHAR(36) NULL,
    severity NVARCHAR(50) NOT NULL DEFAULT 'info',
    details NVARCHAR(MAX) NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- ====================================================================
-- SEED INITIAL ENTERPRISE DATA
-- ====================================================================

-- Seed Admin
INSERT INTO dbo.users (id, email, password_hash, full_name, phone, role, is_verified, status)
VALUES ('u-admin-01', 'admin@pulseai.io', '$2b$12$eXampleHashedPassword1234567890123456789012', 'Alex Vance (Chief QC Officer)', '+1 800 555 0199', 'super_admin', 1, 'active');

-- Seed Client User & Profile
INSERT INTO dbo.users (id, email, password_hash, full_name, phone, role, is_verified, status)
VALUES ('u-client-01', 'client@unilever-cpg.com', '$2b$12$eXampleHashedPassword1234567890123456789012', 'Sarah Jenkins', '+1 212 555 0142', 'client', 1, 'active');

INSERT INTO dbo.client_profiles (id, user_id, company_name, industry, service_needed, store_count, city, country, designation, billing_address, total_spent)
VALUES ('cp-01', 'u-client-01', 'Unilever Consumer Brands', 'Retail & FMCG', 'Retail Shelf Planogram & Computer Vision (CV) Audits', '150 stores', 'Dubai, UAE', 'United Arab Emirates', 'Regional Quality Director', '100 Madison Ave, New York, NY', 12500.0);

-- Seed Shopper Users & Profiles
INSERT INTO dbo.users (id, email, password_hash, full_name, phone, role, is_verified, status)
VALUES 
('u-shopper-01', 'tariq.mansoor@fieldforce.ae', '$2b$12$eXampleHashedPassword1234567890123456789012', 'Tariq Mansoor', '+971 50 123 4567', 'shopper', 1, 'active'),
('u-shopper-02', 'marcus.sterling@shopper.io', '$2b$12$eXampleHashedPassword1234567890123456789012', 'Marcus Sterling', '+1 917 555 0188', 'shopper', 1, 'active'),
('u-shopper-03', 'elena.rostova@shopper.io', '$2b$12$eXampleHashedPassword1234567890123456789012', 'Elena Rostova', '+44 20 7946 0912', 'shopper', 1, 'active');

INSERT INTO dbo.shopper_profiles (id, user_id, city, country, gender, payout_method, trust_score, is_available, kyc_status, balance_earned, completed_audits_count)
VALUES
('sp-01', 'u-shopper-01', 'Dubai, UAE', 'United Arab Emirates', 'Male', 'Direct Bank Wire / IBAN', 99.0, 1, 'verified', 840.0, 28),
('sp-02', 'u-shopper-02', 'New York, USA', 'United States', 'Male', 'PayPal Express', 98.5, 1, 'verified', 620.0, 22),
('sp-03', 'u-shopper-03', 'London, UK', 'United Kingdom', 'Female', 'Stripe Connect', 95.0, 1, 'verified', 450.0, 15);

-- Seed Projects
INSERT INTO dbo.projects (id, client_id, title, raw_brief, project_type, status, payout_per_task, target_quota, completed_quota, instructions)
VALUES 
('proj-01', 'cp-01', 'Q3 Global Ready-to-Drink Beverage Planogram & OOS Audit', 'Audit 200+ major supermarket locations in Dubai, London, New York for primary beverage aisle endcaps and out-of-stock compliance.', 'retail_audit', 'active', 32.0, 120, 84, 'Capture primary beverage facing. Check out-of-stock SKUs and unit prices.'),
('proj-02', 'cp-01', 'Luxury Fashion Boutique Mystery Shopping & Associate Hospitality', 'Evaluate greeting response time, product demonstration depth, and checkout courtesy across flagship boutiques.', 'mystery_shopping', 'active', 50.0, 40, 29, 'Record sales greeting time. Evaluate associate courtesy.');

-- Seed Locations
INSERT INTO dbo.locations (id, project_id, store_name, branch_code, address, city, country, latitude, longitude, geofence_radius_meters, status)
VALUES
('loc-01', 'proj-01', 'Carrefour Hypermarket - Mall of the Emirates', 'DXB-MOE-01', 'Mall of the Emirates, Al Barsha 1', 'Dubai', 'United Arab Emirates', 25.1181, 55.2007, 150.0, 'completed'),
('loc-02', 'proj-01', 'Whole Foods Market - Columbus Circle', 'NYC-CC-02', '10 Columbus Circle, Manhattan', 'New York', 'United States', 40.7681, -73.9819, 150.0, 'completed'),
('loc-03', 'proj-01', 'Tesco Superstore - Regent Street', 'LON-REG-03', 'Regent St, Mayfair', 'London', 'United Kingdom', 51.5135, -0.1388, 150.0, 'in_progress');

PRINT 'PulseAI Database Tables & Seed Data Successfully Created in SSMS [AI project]!';
GO
