var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var mongodb = require('mongodb'),
    mongoClient = mongodb.MongoClient,
    ObjectID = mongodb.ObjectID, // Used in API endpoints
    db; // We'll initialize connection below

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')


var MONGODB_URI = process.env.MONGODB_URI;

// Initialize database connection and then start the server.
mongoClient.connect(MONGODB_URI, function (err, database) {
  if (err) {
    process.exit(1);
  }

  db = database; // Our database object from mLab

  console.log("Database connection ready");

  // Initialize the app.
  app.listen(app.get('port'), function () {
    console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
  });
});

