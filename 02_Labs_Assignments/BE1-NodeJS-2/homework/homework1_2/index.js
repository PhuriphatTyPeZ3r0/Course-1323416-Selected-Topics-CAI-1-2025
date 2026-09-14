const express = require('express')
const app = express()
// Home route
app.get('/', (req, res) => {
  res.send('Hello, World!')
})
// My name route
app.get('/myname', (req, res) => {
  res.send('Lionel Messi')
})
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
