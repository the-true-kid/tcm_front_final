const API_BASE_URL = 'http://localhost:5000';

// Fetches the list of questions
export const fetchQuestions = async () => {
  try {
    console.log('Fetching questions...');
    const response = await fetch(`${API_BASE_URL}/questions`);
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched questions:', data);
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

// Submits answers and calculates the bitmask
export const submitAnswers = async (userId, answers) => {
  try {
    console.log('Submitting answers for userId:', userId, 'Answers:', answers);
    const response = await fetch(`${API_BASE_URL}/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, answers }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Backend error details:', errorDetails);
      throw new Error(`Failed to submit answers: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Response from backend after submitting answers:', result);

    if (!result.submissionId || typeof result.submissionId !== 'number') {
      console.error('Invalid submissionId received from backend:', result.submissionId);
      throw new Error('Invalid submissionId received from backend');
    }

    return result.submissionId; // Return the validated submissionId
  } catch (error) {
    console.error('Error submitting answers:', error);
    throw error;
  }
};

// Fetches diagnosis results for a given submissionId
export const fetchDiagnosisResults = async (submissionId) => {
  try {
    console.log('Fetching diagnosis results for submissionId:', submissionId);
    const response = await fetch(`${API_BASE_URL}/diagnosis/${submissionId}`);
    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Backend error details:', errorDetails);
      throw new Error(`Failed to fetch diagnosis results: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched diagnosis results:', data);
    return data;
  } catch (error) {
    console.error('Error fetching diagnosis results:', error);
    throw error;
  }
};


// Fetches treatment plan for a given submissionId
export const fetchTreatmentPlan = async (submissionId) => {
  try {
    console.log('Fetching treatment plan with submissionId:', submissionId);

    if (!submissionId || typeof submissionId !== 'number') {
      console.error('Invalid submissionId provided to fetchTreatmentPlan:', submissionId);
      throw new Error('Invalid submissionId provided');
    }

    const response = await fetch(`${API_BASE_URL}/treatment-plans/${submissionId}`);
    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Backend error details:', errorDetails);
      throw new Error(`Failed to fetch treatment plan: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Fetched treatment plan:', result);
    return result;
  } catch (error) {
    console.error('Error fetching treatment plan:', error);
    throw error;
  }
};

export const fetchUserDetails = async (userId) => {
  try {
    console.log(`Fetching user details for userId: ${userId}`);
    const response = await fetch(`${API_BASE_URL}/users/${userId}/details`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user details: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched user details:', data);
    return data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
