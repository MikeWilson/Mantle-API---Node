const express = require('express')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 5000

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  r /= 255;
  g /= 255;
  b /= 255;
  return `{"r":${r},"g":${g},"b":${b}}`;
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(cors())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .set('json spaces', 2)
  .get('/hexToRGB', (req, res) => {
    if (req.query["color"]) {
      res.send(hexToRgb(req.query.color)) 
    }
  })
  .get('/colors', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({
      "Charcoal": "#343a40",
      "Smoke": "#535b64",
      "Rhino": "#868e96",
      "Silver": "#cfd4da",
      "Pearl": "#F3F4F6",
      "White": "#FFFFFF",
  })})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))