**Project Title:** Jobify

**Project Overview:** Jobify is a web application that allows an admin to manage companies
and their respective job listings. The admin can log in, manage users, add, update, delete,
and view companies and jobs. The application will feature role-based authentication, AI-
powered features, robust pagination, advanced filtering, sorting, and state management
with Redux, all developed using the MERN stack (MongoDB, Express.js, React, and
Node.js).

**Objectives:**

- **Role-Based Authentication:** Implement role-based access control for admin and
  super-admin users using token-based authentication.
- **User Management:** Allow the super-admin to manage (create, update, delete)
  other admin accounts.
- **Company & Job Management:** Enable the admin to manage companies and their
  jobs with advanced filtering, searching, and sorting options.
- **AI Text Generation:** Add AI-based features for generating job descriptions or
  candidate outreach messages based on input parameters (e.g., company, role).
- **Pagination & Optimization:** Implement pagination with optimized queries and lazy
  loading.
- **File Uploads:** Implement file uploads for company logos and job descriptions.

# Technical Requirements

**_Frontend_**

- **Framework:** React.js
- **State Management:** Redux
- **Routing:** React Router
- **UI Components:** Styled Components, Tailwind
- **HTTP Client:** Axios or Fetch API
- **Performance:** Implement lazy loading and code splitting for improved
  performance.
- **AI Integration:** Use a text generation API (GroqCloud) for generating job
  descriptions or outreach messages.
- **Security:** Add security headers (e.g., CSP) and protection against XSS and CSRF.

**_Backend_**

- **Framework:** Node.js with Express.js
- **Database:** MongoDB (Free online MongoDB cluster with sharding)
- **Authentication:** JWT (JSON Web Tokens) with role-based access control
- **ORM/ODM:** Mongoose
- **AI Model Integration:** Integrate AI services (e.g., OpenAI GPT-3/4) to provide
  intelligent suggestions and text generation for job postings and communications.
- **Caching:** Redis for caching frequent database queries and API responses.
- **Background Jobs:** Use a background processing system (e.g., BullMQ.js) for
  handling long-running tasks like AI text generation.

# Detailed Requirements

**_1. Authentication & Authorization_** - Implement secure, role-based access using JWT with role distinction between
admin and super-admin. - Super-admins can manage admin accounts; admins can manage companies and
jobs.
**_2. Advanced Filtering and Search_** - Implement filtering for job listings by various criteria (type, salary,
company, sort). - Provide search functionality with intelligent text input suggestions for jobs and
companies.
**_3. AI-Powered Job Descriptions and Outreach Messages_** - Use an AI service (e.g., GroqCloud) to auto-generate job descriptions or outreach
messages based on user input. - Allow the admin to click a button to generate a description or email template when
creating or editing job listings.

**_4. Pagination & Query Optimization_** - Implement efficient pagination with optimized MongoDB queries and lazy loading
for job and company lists to ensure scalability. - Use Redis to cache frequently accessed data for improved performance.
**_5. File Uploads_** - Implement file upload functionality for adding company logos and job description
PDFs, utilizing a cloud-based file storage solution (e.g., Google Cloud). - Validate file types and sizes both on the client and server side for security and
performance.
