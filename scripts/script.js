function showPosts(data){
	//console.log(data.posts[0].title)
	var html = '<ul data-role="listview">';
	$.each(data.posts,function(k,v){
		//console.log(v.title);
		html += '<li>';
		html += '<a href="#post" onclick="loadPost(' + v.id + ')">'
		html += '<h3>' + v.title + '</h3>';
		html += '<p>' + v.excerpt + '</p>';
		html += '</a>'
		html += '</li>';
	});
	html += '</ul>';
	$('#blog-wrapper').html(html);
}

//// jeden wpis
function loadPost(id){
	$.getJSON('http://blog.strefakursow.pl/?json=get_post&post_id=' + id + '&callback=?', function(data){
		var html = '';
		html += '<h3>' + data.post.title + '</h3>';
		html += data.post.content;
		$('#post-wrapper').html(html);
	});
}


//// VIDEO
function showVideos(data){
	//var html ='';
	console.log(data.feed);
	var html = '<ul data-role="listview">';
	
	for (var i=0; i<data.feed.entry.length; i++){
		
		var title = data.feed.entry[i].title.$t;
		var thumb = data.feed.entry[i].media$group.media$thumbnail[1].url;
		var id = data.feed.entry[i].id.$t.substring(38);
		//var desc = data.feed.entry[i].media$group.media$description.$t;
		//var published = data.feed.entry[i].published.$t;
		var views = data.feed.entry[i].yt$statistics.viewCount;
		
		html += '<li>';
		//html += '<a href=' + ytlink + '>';
		//html += '<a href="#player" onclick="loadPlayer(\'' + id + '\',\' + title + '\')" >';
		html += '<a href="#player" onclick="loadPlayer(\'' + id + '\',\'' + title + '\')" >';
		html += '<img src="' + thumb +' " alt="' + title + '">';
		html += '<h3>' + title + '</h3>';
		html += '<p>Odsłony: ' + views + '</p>';
		html += '</a>';
		html += '</li>';
	}
	
	html += '</ul>';
	$('#videos-wrapper').html(html);
}

/// pojedynczy film
function loadPlayer(id, title){
	var html = '';
	html += '<iframe width="640" height="360" src="http://youtube.com/embed/' + id + '?wmode=transparent&amp;rel=0&amp;showinfo=0&amp;" autoplay="1" frameborder="0" allowfullscreen seamless></iframe>'; 
	html += '<h3>' + title + '</h3>';
	$('#video').html(html);
}

/*


console.log(data.feed);
data.feed.entry.length
data.feed.entry[0]
data.feed.entry[0].title.$t
data.feed.entry[0].media$group.yt$duration.seconds
data.feed.entry[0].id.$t.substring(38)
*/