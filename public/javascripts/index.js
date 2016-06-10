$('#searchForm').submit(function(e){
	console.log('submitted')
	e.preventDefault();
	mydata = [];
	if ($('input[name="song"]').val()){
		mydata.push('song='+$('input[name="song"]').val())
	}
	if ($('input[name="artist"]').val()) {
		mydata.push('artist='+$('input[name="artist"]').val())
	}
	mydata.push('type='+$('option[name="type"]:selected').val())
	mydata.push('filter='+$('option[name="filter"]:selected').val())
	mydata = mydata.join('&');

	$.ajax({
		type: "POST",
		url: "/search",
		data: mydata,
		datatype: 'json'
	}).done(function(data){
		$('#dropdowns').attr('aria-expanded', 'false')
		$('#otherdropdown').removeClass('open')
		$('#cards-container').fadeOut(500, function(){$('#cards-container').empty()}).fadeIn(500, function(){
			if (data.length == 0) {
				$('#cards-container').append('<h1>We\'ve got nothing. :( Have you tried <a href="/add">Adding a tab?</a></h1>')	
			}
			for (var i=0; i<data.length; i++) {
				var card = $('<div class="card-container"><div class="card" data-id="'+data[i]._id+'"><div class="heading '+data[i].rating_val+'"><h1>'+data[i].song+' '+data[i].type+'</h1><h2>'+data[i].artist+'</h2><span>'+data[i].rating_val+'<br>View Tab</span></div><div class="ratebar" data-value="'+data[i].rating_val+'"></div><div class="rating">'+data[i].rating_count+' reviews<h4>'+data[i].rating_text+'</h4></div></div><div class="clearfix"></div>');
				$('#cards-container').append(card);
			}
			$('.card').each(function(i) {
			    $(this).delay(i * (70-i/1.3)).animate({
			    	opacity: 1,
			    	top:0
			    }, 500)
			});

			$('.ratebar').each(function(i){
				if ($(this).data('value') >= 4.6){
					$(this).css('background-color', 'rgba(10,95,10,.7)');
				} else if ($(this).data('value') > 4.0) {
					$(this).css('background-color', 'rgba(10,95,80,.7)');
				} else if ($(this).data('value') > 3.0) {
					$(this).css('background-color', 'rgba(60,75,100,.7)');
				} else {
					$(this).css('background-color', 'rgba(160,75,50,.7)');
				}
				rate = $(this).data('value') * 36;
				$(this).delay(100).animate({
					width: rate
				}, 2500)
			})
		})
	})
})

$('#submitter').on('click', function(){
	$('#searchForm').submit();
})