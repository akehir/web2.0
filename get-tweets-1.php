<?php
$since = date('Y-m-d', strtotime('-30 days'));

session_start();
require_once("twitteroauth-master/twitteroauth/twitteroauth.php"); //Path to twitteroauth library
 
$twitteruser = "LordAvari";
$notweets = 30;
$consumerkey = "ZYGyFslK8IdGoaeBsbnKXVVah";
$consumersecret = "igrwkYEkX8jamWAWTBdE76ncOobWvo5Jbv9yjN73Ljf05h7ean";
$accesstoken = "984225504-j8tsF1uQ40DAS01yKW0eEQ2WCKlXKkzSgRWqbdsn";
$accesstokensecret = "cdZB6SKOaon8st6ihTLCiIvC1wC7ALn2gkk8UnWLhcyUD";
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
# id = 1	word-wide
$tweets = $connection->get("https://api.twitter.com/1.1/trends/place.json?id=1&exclude=hashtags");
$text = json_encode($tweets);
$file = fopen("tweets-1.txt", "w");
fwrite($file, $text);
fclose($file);

preg_match_all("|\"name\":\"(.*)\"|U", $text, $matches);
for($i = 0; $i < count($matches[1]); $i++){
	$query = $matches[1][$i];
	$ch = curl_init( "http://api.feedzilla.com/v1/articles/search.json?q=$query&count=10&title_only=1&since=$since" );
	curl_setopt( $ch, CURLOPT_VERBOSE, 1 );
	curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1 );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
	$response = curl_exec( $ch );
	curl_close( $ch );

	$file = fopen("tweets-1-$i.txt", "w");
	fwrite($file, $response);
	fclose($file);
	
}
?>
