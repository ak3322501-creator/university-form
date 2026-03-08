# **App Name**: UniAdmit Flow

## Core Features:

- Applicant Submission Wizard: A five-step multi-page form enabling applicants to submit personal, academic, program, document, and declaration details, with progress saving and inline validation.
- Integrated Document Uploads: Securely upload required documents (CNIC, certificates, photos) to Supabase Storage during the application process, with progress and status tracking.
- Public Application Status Tracker: A public interface for applicants to track the real-time status of their submission using their Application ID or CNIC.
- Staff Authentication & Access Control: Secure email/password login for administrative staff with role-based authorization to access protected sections of the portal.
- Admin Application Dashboard: A centralized dashboard for staff to view, search, filter, and manage all submitted applications with various statistics and reporting options.
- Application Review Interface: A dedicated page for reviewers to assess individual applications, assign merit scores, provide remarks, and make admission decisions (Accepted/Rejected/Waitlisted).
- Automated Email Notifications: Sends transactional emails to applicants and administrators for key events like application submission and status changes, utilizing the Resend API.

## Style Guidelines:

- Scheme: A professional light theme for clarity and readability, leveraging classic university tones.
- Primary color: Deep Navy (#0A1628) for headings and prominent brand elements, conveying authority and distinction. (HSL: 217, 48%, 10%)
- Background color: A very light, desaturated blue-gray (#EDF0F3), providing a clean and understated canvas. (HSL: 217, 20%, 95%)
- Accent color: Classic Gold (#C9A84C) to highlight interactive elements, calls to action, and key information, adding a touch of elegance. (HSL: 41, 57%, 55%)
- Headings: 'Playfair Display' (serif) for a sophisticated, high-end feel in titles and prominent text. Note: currently only Google Fonts are supported.
- Body Text: 'DM Sans' (sans-serif) for all body copy, offering excellent readability and a modern, clean aesthetic. Note: currently only Google Fonts are supported.
- Utilize a consistent set of clean, line-art icons from shadcn/ui that support clarity and functionality without overwhelming the visual design.
- Public forms feature a multi-step wizard with clear progress indicators, while the Admin portal adopts a structured sidebar navigation and responsive data tables suitable for various screen sizes.
- Implement subtle and professional animations for page transitions, form submissions, and status updates, providing a smooth user experience.