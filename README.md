# Quarynox - PYQ Downloader Tool

Quarynox is a web application that allows students to easily find and download previous year question papers (PYQs). Administrators can upload and manage exam PDFs, while students can filter and download them without requiring login.

## Features

### Admin Panel (Private & Secure)
- Admin Signup/Login system
- Password-protected access
- Only authenticated admins can access the panel
- Logout and session management

### Admin Features
- Upload/manage exam PDF files
- Add details (metadata) to each PDF:
  - College
  - Course
  - Year
  - Semester
  - Subject
- Add, Edit, Delete options for:
  - Colleges
  - Courses
  - Semesters
  - Subjects
- Edit/delete uploaded files anytime

### Student Interface (Public & SEO-Friendly)
- No login required for students
- Clean, fast, and mobile-friendly design
- Responsive layout for all devices
- Easy filter system:
  - College → Course → Year → Semester → Subject
- Results shown in list or grid view
- One-click PDF download

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js, Redux, Bootstrap
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local storage with Multer

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. Clone the repository
   ```
   git clone <repository-url>
   cd quarynox
   ```

2. Install server dependencies
   ```
   npm install
   ```

3. Install client dependencies
   ```
   npm run client-install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/quarynox
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=24h
   ```

5. Run the development server (both frontend and backend)
   ```
   npm run dev
   ```

## Usage

### Admin Access

1. Register as an admin at `/admin/register`
2. Login at `/admin/login`
3. Use the admin dashboard to manage colleges, courses, semesters, subjects, and papers

### Student Access

1. Visit the homepage
2. Use the filters to find the desired papers
3. Download papers with a single click

## Deployment

1. Build the React frontend
   ```
   npm run build
   ```

2. Set NODE_ENV to production in your environment
   ```
   NODE_ENV=production
   ```

3. Start the server
   ```
   npm start
   ```

## License

MIT