# 🧑‍🎓 School Vaccination Portal – Frontend

This is the **frontend** for the School Vaccination Portal, built with **React.js** and **Tailwind CSS**. It allows school coordinators to manage student vaccination records — including filtering, report generation, and bulk uploads via CSV.

---

## 🛠 Tech Stack

- React.Js
- Tailwind CSS
- Axios
- TypeScript

---

## ✨ Features

### ✅ Simulated Authentication

- Role: School Coordinator (Admin)
- Hardcoded login simulation
- Redirect to dashboard after login

### 📊 Dashboard Overview

- Total students, vaccinated count, % vaccinated
- Upcoming vaccination drives (within 30 days)
- Empty state handling (e.g., "No upcoming drives")

### 👨‍🎓 Student Management

- Add/edit individual students via a form
- Bulk upload students via CSV
- Filter/search by name, grade, ID, or vaccination status
- Prevent duplicate vaccination records

### 💉 Vaccination Drive Management

- Create/edit drives (vaccine name, date, doses, target grades)
- Prevent scheduling in the past or less than 15 days ahead
- Disable editing for past/expired drives

### 📈 Reports & Export

- Filter reports by grade or vaccine
- Export report as CSV or PDF
- Pagination supported

---

## 🚀 Getting Started

### 1. Clone the repository

- git clone https://github.com/aikansh-bits/School-Vaccination-Portal-Frontend.git
- cd School-Vaccination-Portal-Frontend

### 2. Install dependencies

npm install

### 3. Configure environment variables

REACT_APP_API_BASE_URL=""

### 4. Run the app

npm start
