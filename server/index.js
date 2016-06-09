var Path = require('path');
var browserify = require('browserify-middleware');
var express = require('express');
var app = express();

//
// Serve a browserified file for GET /scripts/app-bundle.js
//
app.get('/scripts/app-bundle.js',
  browserify('./client/markdown/browser.js'));

//
// Non-js static files
//
var assetFolder = Path.resolve(__dirname, '../client/public')
app.use(express.static('client'));

app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' )
})


var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on port", port);

