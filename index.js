const { urlencoded } = require('express');
const express = require('express');
const index = express();
const EXP_PORT = 8081;
const prodspec = require('./routes/prodspec.js');


index.use(express.urlencoded({extended: true}));
index.use('/api/prodspec', prodspec);

index.listen(EXP_PORT, () => {
  console.log('Ich höre auf Port! ' + EXP_PORT);
});