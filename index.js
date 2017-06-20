var youTubeURL='https://www.googleapis.com/youtube/v3/search';
function queryAPI(searchTerm){
	var query={
		q:searchTerm + ' in:title',
		part:'snippet',
		key:'AIzaSyCR9HOggl42tEUr97BuhC_DcpWOaPn8ano'
	};
	$.getJSON(youTubeURL,query,devInfo);
}
function devInfo(data){
	$('#output').empty();
	data.items.map(function(item, index){
		var imgURL=item.snippet.thumbnails.default.url;
		var newElem=$('#template').clone();
		newElem.find('img').attr('src',imgURL);
		newElem.removeAttr('hidden');
		$('#output').append(newElem);
	});
}

function onSubmit(){
	$('#youTubeSearch').on('submit',function(event){
		event.preventDefault();
		queryAPI($('#vidSearch').val());
	});
}

$(function(){
	onSubmit();
});