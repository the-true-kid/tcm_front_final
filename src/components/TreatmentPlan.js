import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTreatmentPlan } from '../utils/api';
import UserContext from '../context/UserContext';
import NavBar from './NavBar';
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';

function TreatmentPlan() {
  const { submissionId } = useParams();
  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const [error, setError] = useState('');
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is not authenticated
    if (!user) {
      console.error('User not authenticated. Redirecting to login.');
      navigate('/login');
      return;
    }

    // Validate submissionId
    if (!submissionId || isNaN(Number(submissionId))) {
      console.error('Invalid or missing submissionId:', submissionId);
      setError('Invalid submission ID. Please try again.');
      return;
    }

    async function loadTreatmentPlan() {
      try {
        console.log(`Fetching treatment plan for submissionId: ${submissionId}`);
        const data = await fetchTreatmentPlan(Number(submissionId));
        console.log('Fetched treatment plan:', data);
        setTreatmentPlan(data);
      } catch (err) {
        console.error('Error fetching treatment plan:', err);
        setError('Failed to load treatment plan. Please try again later.');
      }
    }

    loadTreatmentPlan();
  }, [submissionId, user, navigate]);

  if (!user) {
    return null; // Optionally render a loading spinner or placeholder
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!treatmentPlan) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading treatment plan...
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
            Treatment Plan for Submission ID: {submissionId}
          </Typography>

          {treatmentPlan.map((organ) => (
            <Card key={organ.organ_name} sx={{ mb: 3 }}>
              <CardHeader title={organ.organ_name} sx={{ bgcolor: 'primary.main', color: 'white' }} />
              <CardContent>
                {/* Food Section */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">Food Recommendations</Typography>
                  <Divider sx={{ mb: 1 }} />
                  {organ.foods && organ.foods.length > 0 ? (
                    organ.foods.map((food, index) => (
                      <Typography key={index} variant="body1">
                        <strong>{food.food_name}</strong>: {food.properties}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No food recommendations available.
                    </Typography>
                  )}
                </Box>

                {/* Herbs Section */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">Herbal Remedies</Typography>
                  <Divider sx={{ mb: 1 }} />
                  {organ.herbs && organ.herbs.length > 0 ? (
                    organ.herbs.map((herb, index) => (
                      <Typography key={index} variant="body1">
                        <strong>{herb.herb_name}</strong>: {herb.properties}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No herbal remedies available.
                    </Typography>
                  )}
                </Box>

                {/* Emotions Section */}
                <Box>
                  <Typography variant="h6">Lifestyle & Emotions</Typography>
                  <Divider sx={{ mb: 1 }} />
                  {organ.emotions && organ.emotions.length > 0 ? (
                    organ.emotions.map((emotion, index) => (
                      <Typography key={index} variant="body1">
                        <strong>{emotion.emotion_name}</strong>: {emotion.description}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No emotional or lifestyle recommendations available.
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}

          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/current-diagnosis/${submissionId}`)}
            >
              Back to Diagnosis
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default TreatmentPlan;
