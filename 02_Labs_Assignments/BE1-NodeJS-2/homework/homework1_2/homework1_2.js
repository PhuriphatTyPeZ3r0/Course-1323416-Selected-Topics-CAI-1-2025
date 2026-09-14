const express = require('express');
const app = express();
const port = 3000;

// Route 1: /about
app.get('/about', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          background-color: blue;
          color: white;
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
      </style>
    </head>
    <body>
      This is about page.
    </body>
    </html>
  `);
});

// Route 2: /my-json-api3
app.get('/my-json-api3', (req, res) => {
  res.json({
    "University": "PIM"
  });
});

// Route 3: /users2
app.get('/users2', (req, res) => {
  res.json([
    {
      id: 1,
      firstname: 'Somchai',
      lastname: 'Jaidee',
    },
    {
      id: 2,
      firstname: 'Tony',
      lastname: 'Stark',
    },
  ]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
