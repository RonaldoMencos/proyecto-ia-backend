const express = require('express');
const bodyParser = require('body-parser')
const port = 3000;
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});