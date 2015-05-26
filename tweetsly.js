$(document).ready(function() {
	tweetsly(1);
});

function tweetsly(woeid){
	if(woeid == 1){
		$(".page-header").html("Tweetsly - World Wide");
	}else if(woeid == 23424977){
		$(".page-header").html("Tweetsly - USA");
	}

	for(var i = 0; i < 10; i++){
		$("#hit"+(i+1)).html("");
		$("#hit"+(i+1)).addClass("empty-news");
		$("#container"+(i+1)).addClass("empty-news");
	}

	getTweets(woeid);
}

function getTweets(woeid){
	return $.getJSON("./tweetsly/tweetsly-"+woeid+".json", function(json) {
		var trends = json[0].trends;
		var query = "";
		var news = "";

		for(var i = 0; i < trends.length; i++){
			news = "";
			query = trends[i].name;

			news = getNews(woeid, i);
			$("#hit"+(i+1)).html("<div class=''><h1>"+ query +"</h1></div><div class=''>"+ news + "</div><div class=''></div>");
		}
		return 1;
	});

}

function getNews(woeid, count){
	var feedzillaHTML = "";
	$.ajaxSetup( { "async": false } );
	$.getJSON("./tweetsly/tweetsly-"+woeid+"-"+count+".json", function(json) {

		try {
			if(json.articles) {
				var news = json.articles;
				for (var i = 0; i < news.length; i++) {
					feedzillaHTML += "<div class='row'>";
					feedzillaHTML += "<div class='news news" + (i + 1) + "'>";
					feedzillaHTML += "<a href='" + news[i].url + "' target='_blank'>";
					try {
						feedzillaHTML += "<div class='newspicture col-lg-4 col-xs-4'><img class='img-responsive img-news' src='" + news[i].enclosures[0].uri + "' />";
						// make column for news entry 8, as image is 4
						feedzillaHTML += "</div><div class='newsentry col-lg-8 col-xs-8'>";
					} catch (err) {
						// make col for news 12, if with news, make col for news 8
						feedzillaHTML += "<div class='newsentry col-lg-12 col-xs-12'>";
					}
					feedzillaHTML += "<p>" + news[i].title + " | " + news[i].publish_date + "</p>";

					feedzillaHTML += "</div></a></div></div>";
					if (i < (news.length - 1)) {
						feedzillaHTML += "<div class='row'><hr></div>" // add horizontal line as divider to all but the last image.
					}
				}
				if(news.length > 0) {
					$("#container" + (count + 1)).removeClass("empty-news");
					$("#hit" + (count + 1)).removeClass("empty-news");
				}else{
				$("#hit"+(count+1)).addClass("empty-news");
				$("#container"+(count+1)).addClass("empty-news");
			}
			}else{
				$("#hit"+(count+1)).addClass("empty-news");
				$("#container"+(count+1)).addClass("empty-news");
			}
		} catch(err) {
			console.log("error in feedzilla query", count);
		}
	});
	$.ajaxSetup( { "async": true} );
	return feedzillaHTML;
}
