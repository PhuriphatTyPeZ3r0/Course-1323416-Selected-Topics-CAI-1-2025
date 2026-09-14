const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


// Route: /read-users
app.get('/read-users', (req, res) => {
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      res.status(500).json({ error: 'Error reading file' });
      return;
    }

    // Parse the JSON and send it
    const users = JSON.parse(data);
    res.json(users);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
