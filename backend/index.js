var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(cors());
app.use(express.json());

var connection = "mongodb+srv://yuvikagupta1121:Yuvika123@cluster0.d0rjns4.mongodb.net/?appName=Cluster0";
var db;

MongoClient.connect(connection).then((succ) => {
    console.log("db connected");
    db = succ.db("mydatabase");
})

app.post("/loginadmin", (req, res) => {
    db.collection("users").findOne(req.body).then((succ) => {
        res.send(succ);
    })
})

app.post("/adminlogincheck", (req, res) => {
    db.collection("users").findOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ);
    })
})

app.post("/addcategories", (req, res) => {
    db.collection("categories").insertOne(req.body).then((succ) => {
        res.send("ok")
    })
})

app.post("/fetchcategories", (req, res) => {
    db.collection("categories").find().toArray().then((succ) => {
        res.send(succ);
    })
})

app.post("/deletecategory", (req, res) => {
    db.collection("categories").deleteOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ)
    })
})

app.post("/submitarticle", (req, res) => {
    db.collection("articles").insertOne(req.body)
        .then((succ) => {
            res.send("ok")
        })
})

app.post("/fetcharticles", (req, res) => {
    db.collection("articles").find().toArray()
        .then((succ) => {
            res.send(succ)
        })
})

app.post("/deletearticle", (req, res) => {
    db.collection("articles").deleteOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send("ok")
    })
})

app.post("/fetchsinglearticles", (req, res) => {
    db.collection("articles").findOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ)
    })
})

app.post("/updatearticle", (req, res) => {
    db.collection("articles").updateOne({
        _id: new mongodb.ObjectId(req.body.Id)
    },
        {
            $set: {
                Title: req.body.Title,
                Content: req.body.Content,
                Category: req.body.Category,
                Author: req.body.Author,
                Image: req.body.Image,
                Trending: req.body.Trending,
                Latest: req.body.Latest,
            }
        }).then((succ) => {
            res.send("ok")
        })
})

app.post("/bulkuploadarticles", (req, res) => {
    db.collection("articles").insertMany(req.body.Articles)
        .then((succ) => {
            res.send("ok")
        })
})

app.listen(1000, (req, res) => {
    console.log("Server Started");
})