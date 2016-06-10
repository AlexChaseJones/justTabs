$('#scrolltop').on('click', function(){
	$("html, body").animate({ scrollTop: 0 }, 600);
})

$("#body-container").fadeIn(800);

$('#increase').on('click', function(){
	if ($('pre').css('font-size') != "24px") {
	$('pre').css('font-size', "+=1")
}
});

$('#decrease').on('click', function(){
	if ($('pre').css('font-size') != "7px") {
	$('pre').css('font-size', "-=1")
}
});

$('.fontsize').on('mousedown', function(){
	$(this).css('box-shadow', '0px 0px 5px 1px black inset')
})


$('.fontsize').on('mouseup', function(){
	$(this).css('box-shadow', '0px 0px 0px 0px black inset')
})

$('#newcomment').submit(function(e){
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "/comment",
		data: $(this).serialize(),
		datatype: 'json'
	}).done(function(data){
		location.reload();
	});
})

if ($('#comments-container').html().length <= 2) {
	$('#comments-container').html('<h2>No comments!</h2>')
}