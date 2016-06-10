var cheerio = require('cheerio');
var request = require('request');

var Tabs = require('../models/tabSchema.js')

builder = {
	bigPull: function(html){
		var links = [];
		$ = cheerio.load(html);
		$('.tr td:nth-child(2)').find('a').each(function(){
			links.push($(this).attr('href'));
		})
		$('.tr').next().find(' td:nth-child(2)').find('a').each(function(){
			links.push($(this).attr('href'));
		});
		// This puts a set timeout on the scrape so that it appears more human like.
		var i = 0; 
		function myLoop () {       
		  setTimeout(function () {      
		   	request(links[i], function(err, res, html) {
		   		builder.singlePull(html, links[i], function(doc){
		   			console.log('added: '+doc.song)
		   		})
		   		i++;
		   		console.log(i) 
		   	});
	      if (i < links.length) {  
	        myLoop();             
	      }                        
		  }, 3000)
		}
		myLoop(); 
	},
	singlePull: function(html, link, callback){
		Tabs.find({href: link}, function(err, docs){
	    	console.log(docs.length)
	    	if (docs.length == 0) {
	    		console.log('no doc!')
	    		$ = cheerio.load(html);
	    		var songName = $('.t_title div h1').text();
	    		var songLen = $('.t_title div h1').length;
	    		var lastIndex = songName.lastIndexOf(" ");
	    		songName = songName.substring(0, lastIndex); //Removes the word 'tab' or 'chord' from song name. (Always last word in title).
	    		var songType = $('.t_title div h1').text().split(' ').splice(-1,1); //Gets the tab type. (Always last word in title).
	    		var ratecount = parseFloat($('.v_c span').text().replace(',',''))
	    		if (isNaN(ratecount)) {
	    			ratecount = 0;
	    		}
	    		Tabs.create({
	    			href : link,
	    			song: songName,
	    			artist : $('.t_autor a').text(),
	    			type: songType,
	    			rating_val: $('.raiting meta[itemprop=ratingValue]').attr('content'),
	    			rating_count: ratecount,
	    			rating_text: $('.vote-success').text(),
	    			"tab": $('.js-tab-content').text(),
	    		}, function(err, docs){
	    			if (err) {
	    				console.log(err)
	    			} else {
	    				console.log(docs)
	    				callback(docs)
	    			}
	    		})
	    	} else {
	    		callback(docs[0])
	    	}
	    });
	}
};

module.exports = builder;