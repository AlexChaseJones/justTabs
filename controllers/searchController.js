var express = require('express');
var request = require('request');
var builder = require('../db/dbBuilder.js');
var router = express.Router();
var Tabs = require('../models/tabSchema.js')
/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/home');
});

router.get('/home', function(req, res, next){
	res.render('index');
})
router.post('/search', function(req, res, next) {
	var query = {}; 
	// 	NOTE: RegExp is used to allow partial searches in the DB.
	if (req.body.song) {
		var songRegex = "(" + req.body.song + ")";
		songRegex = new RegExp(songRegex, "ig");
		query.song = songRegex;
	}
	if (req.body.artist) {
		var artistRegex = "(" + req.body.artist + ")";
		artistRegex = new RegExp(artistRegex, "ig");
		query.artist = artistRegex;
	}
	if (req.body.type != "both") {
		var typeRegex = "(" + req.body.type + ")";
		typeRegex = new RegExp(typeRegex, "ig");
		query.type = typeRegex;
	}
	if (req.body.filter == "top") {
		sorter = {rating_count: -1};
	} else if (req.body.filter == "recent") {
		sorter = {date: 1}
	} else if (req.body.filter == "comment") {
		sorter = {total_comments: -1}
	}
	Tabs.find(query).sort(sorter).limit(100).exec(function(err, docs){
		res.json(docs)
	})
});

router.get('/top100', function(req, res, next){
	Tabs.find({}).limit(100).sort({rating_count: -1}).exec(function(err, docs){
		res.render('top', {docs})
	})
});

router.get('/tab/:tabId', function(req,res,next){
	Tabs.find({_id: req.params.tabId}, function(err, doc){
		doc = doc[0];
		res.render('tab', {doc})
	})
});

router.get('/add', function(req, res, next){
	res.render('add');
});

router.get('/about', function(req, res, next){
	res.render('about')
});

router.post('/comment', function(req, res, next){
	var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    if(dd<10){
	        dd='0'+dd
	    } 
	    if(mm<10){
	        mm='0'+mm
	    } 
	    var today = dd+'/'+mm+'/'+yyyy;
	var comment = {
		name: req.body.name,
		comment: req.body.comment,
		date: today
	}
	Tabs.findByIdAndUpdate(
		req.body.id,
		{$push: {comments: comment},
		$inc: {total_comments:1}},
		{safe: true, upsert: true},
	    function(err, model) {
		}
	)
	res.end();
})

module.exports = router;