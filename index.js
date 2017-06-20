var app={
	searchTerm:'',
	nextPageToken:''
};

var youTubeURL='https://www.googleapis.com/youtube/v3/search';
function queryAPI(searchTerm){
	var query={
		q:searchTerm + ' in:title',
		part:'snippet',
		key:'AIzaSyCR9HOggl42tEUr97BuhC_DcpWOaPn8ano'
	};
	$.getJSON(youTubeURL,query,devInfo);
}
function queryAPI4More(searchTerm){
	var query={
		q:searchTerm + ' in:title',
		part:'snippet',
		key:'AIzaSyCR9HOggl42tEUr97BuhC_DcpWOaPn8ano',
		pageToken:app.nextPageToken
	};
	$.getJSON(youTubeURL,query,devInfo);
}
function devInfo(data){
	$('#output').empty();
	app.nextPageToken=data.nextPageToken;
	data.items.map(function(item, index){
		var imgURL=item.snippet.thumbnails.default.url;
		var newElem=$('#template').clone();
		newElem.find('img').attr('src',imgURL);
		var vidURL=newElem.find('a').attr('href')+item.id.videoId;
		newElem.find('a').attr('href',vidURL);
		newElem.removeAttr('hidden');
		$('#output').append(newElem);
	});
}
function devInfo2(data){
	$('#output').empty();
	app.nextPageToken=data.nextPageToken;
	data.items.map(function(item, index){
		var imgURL=item.snippet.thumbnails.default.url;
		var newElem=$('#template').clone();
		newElem.find('img').attr('src',imgURL);
		var vidURL=newElem.find('a').attr('href')+item.id.videoId;
		newElem.find('a').attr('href',vidURL);
		newElem.removeAttr('hidden');
		$('#output').append(newElem);
	});
}

function onSubmit(){
	$('#youTubeSearch').on('submit',function(event){
		event.preventDefault();
		var searchTerm=$('#vidSearch').val();
		app.searchTerm=searchTerm;
		queryAPI(searchTerm);
		$('#btnShowMore').removeAttr('hidden');
	});
}

function onShowMore(){
	$('#frmShowMore').on('submit',function(event){
		event.preventDefault();
		queryAPI4More(app.searchTerm);
	});

}

$(function(){
	onSubmit();
	onShowMore();
});