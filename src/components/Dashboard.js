import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import NavBar from './NavBar';
import {
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Paper,
} from '@mui/material';

function Dashboard() {
  const { user } = useContext(UserContext); // Access user from context
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload(); // Reload the app to trigger re-login
  };

  const handleSurveyRedirect = () => {
    navigate('/new-survey');
  };

  const lastSubmission = user?.lastSubmission;

  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome, {user?.username || 'User'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Manage your surveys and results below.
          </Typography>

          <Box mt={3}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleSurveyRedirect}>
                  <ListItemText primary="Start a New Survey" />
                </ListItemButton>
              </ListItem>

              {lastSubmission ? (
                <>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to={`/treatment-plan/${lastSubmission.lastsubmissionid}`}>
                      <ListItemText primary="View Treatment Plan" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to={`/current-diagnosis/${lastSubmission.lastsubmissionid}`}>
                      <ListItemText primary="View Current Diagnosis" />
                    </ListItemButton>
                  </ListItem>
                </>
              ) : (
                <Typography variant="body2" color="textSecondary" mt={2}>
                  No recent submission found. Complete a survey to see results.
                </Typography>
              )}
            </List>
          </Box>

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSurveyRedirect}
            >
              Start a New Survey
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Dashboard;
