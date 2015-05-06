    	$(document).ready(function() {
    		tweetly(1);    		
    	});
    	
    	function tweetly(woeid){    		
    		if(woeid = 1){
    			$(".page-header").html("Top Twitter News - World Wide");    		
    		}else if(woeid = 23424977){
    			$(".page-header").html("Top Twitter News - USA");    	
    		}	    		
    		
            for(var i = 0; i < 10; i++){
            	$("#hit"+(i+1)).html("");
            }
            
            getTweets(woeid);
    	}
    	
    	function getTweets(woeid){
        	return $.getJSON("./tweets-"+woeid+".txt", function(json) {
            	var trends = json[0].trends;
            	var query = "";
            	var news = "";

            	for(var i = 0; i < 10; i++){
               		news = "";
                	query = trends[i].name;

                	news = getNews(woeid, i);
                	$("#hit"+(i+1)).html("<div class='panel-heading'><h1>"+ query +"</h1></div><div class='panel-body'>"+ news + "</div><div class='panel-footer'></div>");
                    $("#container"+(i+1)).removeClass("empty-news");
                	
            	}
            	return 1;
        	});
        	
        }

        function getNews(woeid, count){
            var feedzillaHTML = "";
            $.ajaxSetup( { "async": false } );
            $.getJSON("./tweets-"+woeid+"-"+count+".txt", function(json) {

                var news = json.articles;
                for(var i = 0; i < news.length; i++){
                    feedzillaHTML += "<div class='row'>";
                    feedzillaHTML += "<div class='news news"+(i+1)+"'>";
                    try{
                        feedzillaHTML += "<div class='newspicture col-lg-4 col-xs-4'><img class='img-responsive img-news' src='"+news[i].enclosures[0].uri+"' />";
                        // make column for news entry 8, as image is 4
                        feedzillaHTML += "</div><div class='newsentry col-lg-8 col-xs-8'>";
                    }catch(err) {
                        // make col for news 12, if with news, make col for news 8
                        feedzillaHTML += "<div class='newsentry col-lg-12 col-xs-12'>";
                    }
                    feedzillaHTML += "<p><a href='"+news[i].url+"' target='_blank'>"+ news[i].title+ " | "+ news[i].publish_date +"</a></p>";

                    feedzillaHTML += "</div></div></div>";
                    if(i < (news.length-1) ){
                        feedzillaHTML += "<div class='row'><hr></div>" // add horizontal line as divider to all but the last image.
                    }
                }
            });
            $.ajaxSetup( { "async": true} );
            return feedzillaHTML;
        }