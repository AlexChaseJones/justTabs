$(document).ready(function(){
	$('.card').each(function(i) {
	    $(this).delay(i * (70-i/1.8)).animate({
	    	opacity: 1,
	    	top:0
	    }, 500)
	});
	$('.ratebar').each(function(i){
		if ($(this).data('value') >= 4.5){
			$(this).css('background-color', 'rgba(10,95,10,.7)');
		} else if ($(this).data('value') >= 4.0) {
			$(this).css('background-color', 'rgba(10,95,80,.7)');
		} else if ($(this).data('value') >= 3.0) {
			$(this).css('background-color', 'rgba(60,75,100,.7)');
		} else {
			$(this).css('background-color', 'rgba(160,75,50,.7)');
		}
		rate = $(this).data('value') * 36;
		$(this).delay(100).animate({
			width: rate
		}, 2500)
	})
});

$(document).on('click', '.card', function(){
	link = $(this).data('id');
	$('#body-container').fadeOut(500,function(){
		window.location.href = "tab/" + link;
	})
})

$(document).on("vclick", ".card", function() {
	link = $(this).data('id');
	$('#body-container').fadeOut(500,function(){
		window.location.href = "tab/" + link;
	})
});