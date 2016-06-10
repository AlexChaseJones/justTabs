var express = require('express');
var request = require('request');
var builder = require('../db/dbBuilder.js');
var router = express.Router();

router.get('/big/UG/:url*', function(req, res, next){
	request('https://www.ultimate-guitar.com/' + req.params.url + req.params[0], function(err, res, html){
		if (!err && res.statusCode == 200) {
			builder.bigPull(html)
		}
	})
});

router.get('/single/UG/:url*', function(req, res, next){
	link = 'https://tabs.ultimate-guitar.com/' + req.params.url + req.params[0];
	request(link, function(err, response, html){
		if (!err && res.statusCode == 200) {
			builder.singlePull(html, link, function(doc){
				res.redirect('/tab/'+ doc._id)
			});
		} else {
			console.log(err)
		}
	})
});

module.exports = router;