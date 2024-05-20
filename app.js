const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const textExtractorRouter = require('./scrapering');

// Use the cors middleware
app.use(cors());

// Mount the text extractor router
app.use('/api', textExtractorRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});