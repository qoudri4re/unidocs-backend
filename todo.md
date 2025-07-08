# MAIN FEATURES

## 1. User Portal (Alumni)

### 1.1 🔐 Account & Profile

- [ ] Login
- [ ] Register
- [ ] Forgot Password
- [ ] Reset Password
- [ ] Update Profile
- [ ] Change Password
- [ ] Logout
- [ ] Upload & store ID/school certificate (file input + backend storage)
- [ ] Build user dashboard with request/status overview

### 1.2 Document Request

- [ ] Build document request form (transcript, certificate, NYSC, etc.)
- [ ] Add delivery options (email, courier, inter-institution)
- [ ] Add format options (PDF or hardcopy)
- [ ] Add supporting documents, details, and attachments
- [] add live chat feature

### 1.3 Payment & Fees

- [ ] Display dynamic pricing per document type
- [ ] Integrate payment gateway (Paystack, Flutterwave)
- [ ] Add payment history
- [] Generate & download receipts/invoices (PDF or HTML)

### 1.4 Request Tracking

- [ ] Design tracking UI (progress bar or steps)
- [] Show request history

### 1.5 Notifications

- [ ] Trigger notifications at key stages: payment, approval, dispatch

# 2. Admin Portal

### 2.1 Request Management

- [ ] Create admin logins (with roles)
- [ ] Build dashboard for viewing incoming requests, statistics, and analytics
- [ ] Add filters: department, status, type, date
- [ ] View detailed request info (including uploaded docs) per request
- [ ] Approve / Reject / Request More Info (with reason field)

### 2.2 Document Upload & Generation

- [ ] Allow upload of scanned documents (PDF, image)
- [ ] Apply official stamp, watermark, or digital signature
- [] Add QR code or token for verification

### 2.3 Delivery & Dispatch

- [ ] Implement delivery options (email, courier, inter-institution)
- [ ] Add tracking number or reference
- [ ] Generate dispatch confirmation
- [] Integrate courier APIs (DHL, GIG, NIPOST) for real-time status (optional)

### 2.4 Staff Roles & Permissions

- [ ] Create staff roles (admin, manager, staff)
- [ ] Assign permissions to roles
- [ ] Create staff logins
- [] remove staff
- [] Track audit trail: who did what, when

### 2.5 settings->document type configuration

- [] add document, name, price, description
- [] remove document
- [] update document

### 2.5 settings->app config

- [] add app config (turunaround time)
- [] remove app config
- [] update app config

### 2.6 settings->payment configuration

- [] add payment configuration
- [] remove payment configuration
- [] update payment configuration

### 2.7 settings->school account management

- [] update school details (name, logo, address)
- [] change password
- [] school status (active/inactive)

### 2.8 Document Verification

- [] generate token for document issued
- [] use generated token to verify document (public)

# 3. Super Admin Portal

### 3.1 University Management

- [ ] Add universities
- [ ] Remove universities
- [ ] Update universities

### 3.2 Document Type Management

- [ ] Add document types
- [ ] Remove document types
- [ ] Update document types

### 3.3 School Management

- [ ] Add schools
- [ ] Remove schools
- [ ] Update schools
- [] toogle school status (active/inactive)
- [] Create school admin accounts with default passwords

### 3.4 User Management

- [ ] Add users
- [ ] Remove users
- [ ] Update users

### 3.5 Platform Monitoring

- [ ] View total requests, pending, completed, etc.
- [ ] Breakdown by school, department, or document type
- [ ] Revenue tracking per school or globally
- [] Show active schools

# 4 Monitization

- [ ] Auto-add processing/delivery fees per request

- [ ] Show total breakdown before checkout

# PENDING TASKS

- [ ] run cron job to delete pending verifications that has expired every 24 hours
- [ ] put otp expiry time to use environment variables or app config
