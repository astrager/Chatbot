const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/verify-token', (req, res) => {
	const token = req.body.token;
	// Verify the token with your backend logic here
	// For now, we'll just send a success response
	res.json({ success: true });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});