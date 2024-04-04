/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');


require('dotenv').config();

const app = express();



app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8056;

app.listen(port, () => console.log(`server running on port ${port}`));
