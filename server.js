const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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
app.get('/auth/google/callback', (req, res) => {
    // Handle the Google Sign-In response here
    // You'll need to implement the logic to exchange the code for tokens
    // and create a session for the user
    res.redirect('/'); // Redirect to your main application page after successful sign-in
});

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});