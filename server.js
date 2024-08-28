const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("8381265973-gqdpberiqoho8vupnn5hdd7li4opc345.apps.googleusercontent.com");

app.get('/auth/google/callback', async (req, res) => {
  const { credential } = req.query;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: "8381265973-gqdpberiqoho8vupnn5hdd7li4opc345.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    // Here you can create a session for the user or generate a JWT token
    // For now, we'll just redirect to the main page
    res.redirect('/');
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(400).send('Invalid token');
  }
});
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to verify token
app.post('/verify-token', (req, res) => {
    const token = req.body.token;
    // Verify the token with your backend logic here
    // For now, we'll just send a success response
    res.json({ success: true });
});

// New route to handle Google Sign-In redirect
// app.get('/auth/google/callback', (req, res) => {
//     // Handle the Google Sign-In response here
//     // You'll need to implement the logic to exchange the code for tokens
//     // and create a session for the user
//     res.redirect('/'); // Redirect to your main application page after successful sign-in
// });

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});