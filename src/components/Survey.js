import React, { useState, useEffect, useContext } from 'react';
import { fetchQuestions, submitAnswers } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import NavBar from './NavBar';
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
} from '@mui/material';

function Survey() {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function loadQuestions() {
      try {
        console.log('Fetching questions...');
        const data = await fetchQuestions();
        if (!data || data.length === 0) {
          setError('No questions available at the moment.');
          return;
        }
        console.log('Fetched questions:', data);
        setQuestions(data);
        setResponses(Array(data.length).fill(false));
      } catch (err) {
        setError('Failed to load questions. Please try again later.');
        console.error('Error fetching questions:', err.message || err);
      }
    }
    loadQuestions();
  }, []);

  const handleResponseChange = (index, value) => {
    console.log(`Changing response for question at index ${index} to ${value}`);
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
    console.log('Updated responses state:', updatedResponses);
  };

  const handleSubmit = async () => {
    try {
      if (!user?.id) {
        setError('User not authenticated. Please log in.');
        return;
      }

      console.log('Preparing answers for submission...');
      const answers = questions.map((q, index) => ({
        bitPosition: q.bit_position,
        isTrue: responses[index],
      }));
      console.log('Prepared answers:', answers);

      const submissionId = await submitAnswers(user.id, answers);
      console.log('Submission successful, Submission ID:', submissionId);

      if (!submissionId || typeof submissionId !== 'number') {
        console.error('Invalid submissionId received from backend:', submissionId);
        throw new Error('Invalid submissionId received');
      }

      localStorage.setItem('lastSubmissionId', submissionId);
      navigate(`/treatment-plan/${submissionId}`);
    } catch (err) {
      setError('Failed to submit survey. Please try again later.');
      console.error('Error submitting survey:', err);
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            New Survey
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {questions?.length === 0 && !error && (
            <Box textAlign="center">
              <Typography variant="body1" gutterBottom>
                {isSubmitting ? <CircularProgress /> : 'No questions available at the moment.'}
              </Typography>
            </Box>
          )}

          <Box component="form" noValidate autoComplete="off">
            {questions?.map((q, index) => (
              <FormControlLabel
                key={q.id}
                control={
                  <Checkbox
                    checked={responses[index]}
                    onChange={(e) => handleResponseChange(index, e.target.checked)}
                  />
                }
                label={q.question_text}
                sx={{ display: 'block', mb: 2 }}
              />
            ))}
          </Box>

          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Survey;
