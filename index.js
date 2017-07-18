var express = require('express');
var firebase = require("firebase-admin");
var bodyParser = require('body-parser');
var request = require('request');
var mongo = require('mongodb').MongoClient
var aws = require('aws-sdk');
var pg = require('pg');

var lyrics = require('./lyrics');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.listen(process.env.PORT || 3000);

/* Firebase */

//connect to Firebase
/* firebase.initializeApp({
    credential: admin.credential.cert({
        "project_id": "",
        "client_email": "",
        "private_key": ""
    }),
    databaseURL: ""
}); */

/* MONGO */

var url = "mongodb://MusicMind:" + encodeURIComponent("6jlewvwvuBVqJls4") + "@features-shard-00-00-edm1t.mongodb.net:27017,features-shard-00-01-edm1t.mongodb.net:27017,features-shard-00-02-edm1t.mongodb.net:27017/MetaMind?ssl=true&replicaSet=features-shard-0&authSource=admin";

/* AWS */

/*
//postgresql
var sUrl = "postgres://ryanboyd:"+ encodeURIComponent("mm456$%^") + "@featuresanalysis.cdk20zakvpps.us-west-1.rds.amazonaws.com:5432";
var client = new pg.Client(sUrl);

//create postgresql client
app.get("/pg", function(req, res){
  client.connect(function(err) {
   if(err){
     console.log(err);
   }
       console.log('PG connected!');

  });
  pg.connect(sUrl, function(err, client, done){
    if(err){
      console.log(err);
    }
    console.log(client);
    console.log(done);
  });
}); */

/*
// Create an S3 client
var s3 = new AWS.S3();

var bucketName = 'node-sdk-sample-' + uuid.v4();
var keyName = 'hello_world.txt';

s3.createBucket({Bucket: bucketName}, function() {
  var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
  s3.putObject(params, function(err, data) {
    if (err)
      console.log(err)
    else
      console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  });
});
*/

/* GET */

app.get("/authenticate", function(req, res) {});

//get databases
app.get("/databases", function(req, res){
  mongo.connect(url, function(err, db) {
    if(err){
      console.log(err);
    }

    var adminDb = db.admin();

    // List all the available databases
    adminDb.listDatabases(function(err, dbs) {
      if(err){
        console.log(err);
      }
      res.status(200).send(dbs);
      console.log(dbs);
      db.close();
    });
  });
});

//get complete posts collection
app.get("/data", function(req, res) {
  mongo.connect(url, function(err, db) {
    if(err){
      console.log(err);
    }
    var dump = [];
    var cursor = db.collection("posts").find();
    cursor.forEach(function(doc){
      dump.push(doc);
    },
    function(){
      res.status(200).send({"mongoData":dump});
      db.close();
    });
  });
});

//get lyrics
app.get("/lyrics", function(req, res) {
  mongo.connect(url, function(err, db) {
    if(err){
      console.log(err);
    }
    db.collection("posts").distinct("lyrics", function(err, docs){
      if(err){
        console.log(err);
      }
      res.status(200).send(lyrics.getLyrics(docs));
      db.close();
    });
  });
});

//get lyrics count of words
app.get("/lyrics/words", function(req, res) {
  mongo.connect(url, function(err, db) {
    if(err){
      console.log(err);
    }
    db.collection("posts").distinct("lyrics", function(err, docs){
      if(err){
        console.log(err);
      }
      res.status(200).send(lyrics.getWords(docs));
      db.close();
    });
  });
});

//get lyrics word frequency
app.get("/lyrics/freq", function(req, res) {
  mongo.connect(url, function(err, db) {
    if(err){
      console.log(err);
    }
    db.collection("posts").distinct("lyrics", function(err, docs){
      if(err){
        console.log(err);
      }
      res.status(200).send(lyrics.getWordFrequency(docs));
      db.close();
    });
  });
});

//get lyrics word per track duration
app.get("/lyrics/duration", function(req, res) {
  mongo.connect(url, function(err, db) {
    if(err){
      console.log(err);
    }
    db.collection("posts").aggregate([
      { "$group": {
        "_id": {
           "lyrics": "$lyrics",
           "feature": "$feature"
        }
      }
  }], function(err, docs){
      if(err){
        console.log(err);
      }
      res.status(200).send(lyrics.getWordsPerDuration(docs));
      db.close();
    });
  });
});

//get list of artists
app.get("/artist", function(req, res) {
  mongo.connect(url, function(err, db) {
    if(err){
      console.log(err);
    }
    db.collection("posts").distinct("artist", function(err, docs){
      if(err){
        console.log(err);
      }
      res.status(200).send(docs);
      db.close();
    });
  });
});

//get list of tracks
app.get("/track", function(req, res) {
  mongo.connect(url, function(err, db) {
    if(err){
      console.log(err);
    }
    db.collection("posts").distinct("track", function(err, docs){
      if(err){
        console.log(err);
      }
      res.status(200).send(docs);
      db.close();
    });
  });
});

//get list of albums
app.get("/album", function(req, res) {
  mongo.connect(url, function(err, db) {
    if(err){
      console.log(err);
    }
    db.collection("posts").distinct("album", function(err, docs){
      if(err){
        console.log(err);
      }
      res.status(200).send(docs);
      db.close();
    });
  });
});

//get user data
app.get("/user/:id", function(req, res) {
    var userId = req.params.id;

    //call database with userId query

    var success = "Success";
    if (success){
      res.status(200).send(success + " with userId " + userId);
    }
    else {
      res.status(500).send("Error");
    }
});


/* POST */

//upload video to servers
app.post("/upload", function(req, res) {

    //however you send video data

    var success = "Success";
    if (success){
      res.status(200).send(success);
    }
    else {
      res.status(500).send("Error");
    }
});

//send video to others
app.post("/deliver", function(req, res) {
    var videoId = req.body.videoId;
    var aSendTo = req.body.sendToUserWithId;
    //send video to users

    var success = "Success";
    if (success){
      res.status(200).send(success + " with this videoID '" + videoId +
      "' and sent to these users '" + aSendTo + "'");
    }
    else {
      res.status(500).send("Error");
    }
});
