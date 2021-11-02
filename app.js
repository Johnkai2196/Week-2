'use strict';
const express = require('express');
const app = express();
const port = 3000;

app.get('/cat', (req, res) => {
  res.send('From this endpoint you can get cats.')
});

app.get('/cat/:catId',(req,res)=>{
  console.log('/cat route',req.params)
  res.send(`Form this endpoint you can get a specific cat. The catID is ${req.params.catId}`)
})
app.post('/cat', (req, res) => {
  res.send('From this endpoint you can add cats.')
});
app.put('/cat', (req, res) => {
  res.send('From this endpoint you can put cats.')
});
app.delete('/cat', (req, res) => {
  res.send('From this endpoint you can delete cats.')
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
