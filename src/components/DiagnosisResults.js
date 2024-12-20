import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDiagnosisResults } from '../utils/api';
import NavBar from './NavBar';
import {
  Button,
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';

function DiagnosisResults() {
  const { submissionId } = useParams(); // Use submissionId dynamically from the route
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    if (!submissionId || isNaN(Number(submissionId))) {
      console.error('Invalid or missing submissionId:', submissionId);
      setError('Invalid submission ID. Please try again.');
      setLoading(false);
      return;
    }

    async function loadResults() {
      try {
        console.log(`Fetching diagnosis results for submissionId: ${submissionId}`);
        const data = await fetchDiagnosisResults(Number(submissionId));
        console.log('Fetched diagnosis results:', data);

        if (data.length === 0) {
          setError('No diagnosis results found for the specified submission.');
        } else {
          setResults(data);
        }
      } catch (err) {
        console.error('Error fetching diagnosis results:', err);
        setError('Failed to load diagnosis results. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, [submissionId]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading diagnosis results...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Diagnosis Results for Submission ID: {submissionId}
          </Typography>
          <List>
            {results.map((result) => (
              <ListItem key={result.id} sx={{ mb: 2 }}>
                <ListItemText
                  primary={<Typography variant="h6">{result.organ_name}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body1" gutterBottom>
                        {result.diagnosis_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {result.description}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/treatment-plan/${submissionId}`)}
            sx={{ mt: 3 }}
          >
            View Treatment Plan
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default DiagnosisResults;
