# Traditional Chinese Medicine (TCM) Diagnosis App

## Overview
The Traditional Chinese Medicine Diagnosis App is an educational and portfolio project designed to simulate a diagnostic tool inspired by Traditional Chinese Medicine principles. This app allows users to:

- Take surveys to identify symptoms and potential diagnoses based on encoded logic.
- View treatment plans derived from submitted surveys.

### Disclaimer
**This application is for educational purposes only and should not be used for actual medical diagnosis or treatment.** The app is a developer exercise and a portfolio piece, not intended to provide professional medical advice.

---

## Features

### 1. User Management
- User registration and login with email-based authentication.
- Tracks each user's past submissions and related diagnoses.

### 2. Survey and Diagnosis
- Dynamically generated surveys with questions based on organ systems and Yin/Yang principles.
- Bitmask encoding for survey responses to determine diagnoses.

### 3. Treatment Plan
- Displays food, herbs, and lifestyle/emotional recommendations based on diagnoses.
- Supports multi-layered treatment insights.

### 4. Database Integration
- Uses PostgreSQL for persistent data storage.
- Stores users, surveys, diagnoses, and treatment plans.

---

## Technologies Used

- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Other Tools:** JSON Web Tokens (JWT) for authentication, RESTful API design

---

## Installation Guide

### Prerequisites
- Node.js
- PostgreSQL
- npm or yarn

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tcm-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - Create a PostgreSQL database.
   - Run the provided SQL schema and seed files to populate the database.
4. Configure environment variables:
   - Create a `.env` file with the following:
     ```env
     DATABASE_URL=<your-database-url>
     PORT=5000
     ```
5. Start the application:
   ```bash
   npm run start
   ```

---

## Database Schema

### Tables
1. **users**
   - Stores user information (username, email, created_at).

2. **questions**
   - Holds survey questions categorized by organ systems.

3. **diagnostic_rules**
   - Defines possible diagnoses and their associations with organ systems.

4. **user_diagnosis_submissions**
   - Tracks user survey submissions and encoded responses.

5. **diagnosis_results**
   - Links survey submissions to specific diagnoses.

### Relationships
- `questions` links to `organs`.
- `diagnosis_results` links `user_diagnosis_submissions`, `organs`, and `diagnostic_rules`.

---

## API Documentation

### Endpoints

#### **User Endpoints**
- **POST /register**
  - Registers a new user.
  - **Request Body:**
    ```json
    {
      "username": "example",
      "email": "example@mail.com"
    }
    ```

- **POST /login**
  - Logs in an existing user.
  - **Request Body:**
    ```json
    {
      "email": "example@mail.com"
    }
    ```
  - **Response:**
    ```json
    {
      "id": 1,
      "username": "example",
      "email": "example@mail.com",
      "lastSubmission": {
        "lastsubmissionid": 1,
        "answersmask": "34",
        "submissiondate": "2024-12-19T14:56:09.771Z",
        "diagnoses": [
          {
            "organ_name": "Kidney",
            "diagnosis_name": "Kidney Yang Deficiency",
            "description": "Coldness and fatigue related to kidney function."
          }
        ]
      }
    }
    ```

#### **Survey Endpoints**
- **GET /questions**
  - Fetches all survey questions.

- **POST /answers**
  - Submits survey answers.
  - **Request Body:**
    ```json
    {
      "userId": 1,
      "answers": [
        { "bitPosition": 0, "isTrue": true },
        { "bitPosition": 1, "isTrue": false }
      ]
    }
    ```
  - **Response:**
    ```json
    {
      "submissionId": 2
    }
    ```

#### **Diagnosis Endpoints**
- **GET /diagnosis/:submissionId**
  - Fetches diagnoses for a specific submission.

- **GET /treatment-plans/:submissionId**
  - Fetches treatment plans for a specific submission.

---

## Usage

### Steps for Users
1. Register or log in.
2. Start a new survey and answer the questions.
3. View your diagnosis and associated treatment plan.

### Notes
- Each user can view their most recent submission and its corresponding diagnoses and treatments.
- All interactions are stored securely in the database.

---

## Disclaimer
This app is an educational tool and not a substitute for professional medical advice or treatment. Always consult a qualified healthcare provider for any health-related concerns.

---

## Future Work
- **Multi-language Support:** Include Traditional Chinese translations.
- **Enhanced Analytics:** Provide visualized data insights for user responses.
- **Export Features:** Enable exporting treatment plans to PDF.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgements
- Inspiration: Traditional Chinese Medicine principles
- Development: Built as a personal portfolio project

# tcm_front_final
