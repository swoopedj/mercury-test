var Path = require('path');
var browserify = require('browserify-middleware');
var express = require('express');
var app = express();

//
// Serve a browserified file for GET /scripts/app-bundle.js
//
app.get('/scripts/app-bundle.js',
  browserify('./client/markdown/browser.js'));

// app.get('/scripts/count.js', 
//   browserify('./client/components/count.js'));

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


// var browserify = require('browserify-middleware')
// var express = require('express')
// var Path = require('path')

// var routes = express.Router()

// //
// // Provide a browserified file at a specified path
// //
// routes.get('/app-bundle.js',
//   browserify('./client/main.js'))

// //
// // Example endpoint (also tested in test/server/index_test.js)
// //
// // routes.get('/api/tags-example', function(req, res) {
// //   res.send(['node', 'express', 'browserify', 'mithril'])
// // })

// //
// // Static assets (html, etc.)
// //
// var assetFolder = Path.resolve(__dirname, '../client/public')
// routes.use(express.static(assetFolder))


// if (process.env.NODE_ENV !== 'test') {
//   //
//   // The Catch-all Route
//   // This is for supporting browser history pushstate.
//   // NOTE: Make sure this route is always LAST.
//   //
//   routes.get('/*', function(req, res){
//     res.sendFile( assetFolder + '/index.html' )
//   })

//   //
//   // We're in development or production mode;
//   // create and run a real server.
//   //
//   var app = express()

//   // Parse incoming request bodies as JSON
//   app.use( require('body-parser').json() )

//   // Mount our main router
//   app.use('/', routes)

//   // Start the server!
//   var port = process.env.PORT || 4000
//   app.listen(port)
//   console.log("Listening on port", port)
// }
// else {
//   // We're in test mode; make this file importable instead.
//   module.exports = routes
// }
