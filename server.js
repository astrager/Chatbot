const express = require('express'); // Ensure express is required
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const PORT = process.env.PORT || 3000;
const client = new OAuth2Client("8381265973-gqdpberiqoho8vupnn5hdd7li4opc345.apps.googleusercontent.com");

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

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

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});