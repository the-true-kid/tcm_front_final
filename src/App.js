import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Survey from './components/Survey';
import TreatmentPlan from './components/TreatmentPlan';
import DiagnosisResults from './components/DiagnosisResults';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import UserContext from './context/UserContext';
import { fetchUserDetails } from './utils/api'; // Backend API call to fetch user details

function App() {
  const { user, setUser, setLastSubmissionId } = useContext(UserContext);

  useEffect(() => {
    async function initializeUser() {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
        const userDetails = await fetchUserDetails(storedUser.id);
        if (userDetails?.lastSubmissionId) {
          setLastSubmissionId(userDetails.lastSubmissionId);
          localStorage.setItem('lastSubmissionId', userDetails.lastSubmissionId);
        }
      }
    }
    initializeUser();
  }, [setUser, setLastSubmissionId]);

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-survey" element={<Survey />} />
            <Route path="/current-diagnosis/:submissionId" element={<DiagnosisResults />} />
            <Route path="/treatment-plan/:submissionId" element={<TreatmentPlan />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
