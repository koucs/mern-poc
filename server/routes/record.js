const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");
const { ObjectID } = require('mongodb');


// This section will help you get a list of all the records.
recordRoutes.route("/records").get(function (req, res) {
    let db_connect = dbo.getDb();

    // For debug
    // db_connect.listCollections().toArray(function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    // })

    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a list of all the records.
recordRoutes.route("/records/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myQuery = {_id: new ObjectID(req.params.id)}
    db_connect
        .collection("records")
        .findOne(myQuery)
        .then(result => {
            if(result) {
              console.log(`Successfully found document: ${result}.`);
            } else {
              console.log("No document matches the provided query.");
            }
            res.json(result);
        });
});


recordRoutes.route("/records").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myobj = {
        person_name: req.body.person_name,
        person_position: req.body.person_position,
        person_level: req.body.person_level
    };
    db_connect
        .collection("records")
        .insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document created");
        });
    res.sendStatus(204)
});

recordRoutes.route("/records/:id").put(function (req, res) {
    let db_connect = dbo.getDb();
    let myQuery = {_id: new ObjectID(req.params.id)}
    let myobj = {
        $set: {
            person_name: req.body.person_name,
            person_position: req.body.person_position,
            person_level: req.body.person_level
        }
    };
    db_connect
        .collection("records")
        .updateOne(myQuery, myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document updatedd");
        });
    res.sendStatus(204)
});

recordRoutes.route("/records/:id").delete(function (req, res) {
    let db_connect = dbo.getDb();
    let myQuery = {_id: new ObjectID(req.params.id)}
    db_connect
        .collection("records")
        .deleteOne(myQuery, function (err, res) {
            if (err) throw err;
            console.log("1 document deleted");
        });
    res.sendStatus(204)
});


module.exports = recordRoutes;