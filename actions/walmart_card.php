
/*
API Endpoint:	http://api.walmartlabs.com/v1/

apiKey			Your API access key.														Required
lsPublisherId	Your LinkShare Publisher Id	Optional
format			Type of response required, allowed values [json, xml]. Default is json. 	Optional
ids				Comma separated list of item ids											Optional
upc				upc of the item																Optional

lookup:
http://api.walmartlabs.com/v1/items?ids=12417832,19336123&apiKey={apiKey}&lsPublisherId={Your LinkShare Publisher Id}

Search for Ipod:
http://api.walmartlabs.com/v1/search?apiKey={apiKey}&lsPublisherId={Your LinkShare Publisher Id}&query=ipod

Search for Ipod within electronics and sort by increasing price:
http://api.walmartlabs.com/v1/search?apiKey={apiKey}&lsPublisherId={Your LinkShare Publisher Id}&query=ipod&categoryId=3944&sort=price&ord=asc

Search for Ipod within electronics, sort by bestsellers and return full response:
http://api.walmartlabs.com/v1/search?apiKey={apiKey}&lsPublisherId={Your LinkShare Publisher Id}&query=ipod&categoryId=3944&sort=bestseller&responseGroup=full

Search by UPC (Unique Product Code):
http://api.walmartlabs.com/v1/search?apiKey={apiKey}&query={UPC}


Param Name		Description																				Required/Optional
apiKey			Your API access key																		Required
lsPublisherId	Your LinkShare Publisher Id																Optional
query			Search text - whitespace separated 
				sequence of keywords to search for														Required
categoryId		Category id of the category for search
				within a category. This should match the id
				field from Taxonomy API																	Optional
start			Starting point of the results within the 
				matching set of items - upto 10 items will
				be returned starting from this item														Optional
sort			Sorting criteria, allowed sort types are
				[relevance, price, title, bestseller, customerRating, new].
				Default sort is by relevance.															Optional

order			Sort ordering criteria, allowed values are [asc, desc]. This
				parameter is needed only for the sort types [price, title, customerRating].				Optional

numItems		Number of matching items to be returned, max value 25. Default is 10.					Optional

format			Format of the response, allowed values are [xml, json]. Default response
				returned is json.																		Optional

responseGroup	Specifies the item fields returned in the response, allowed response groups
				are [base, full]. Default value is base. Refer Item Response Groups for details
				of exact fields returned by each response group.										Optional

facet 			Boolean flag to enable facets. Default value is off. Set this to on to enable
				facets.																					Optional
facet.filter 	Filter on the facet attribute values. This parameter can be set to
				<facet-name>:<facet-value> (without the angles). Here facet-name and facet-value
				can be any valid facet picked from the search API response when facets are on.			Optional
facet.range		Range filter for facets which take range values, like price. See usage above in the
				examples.																				Optional

*/


/*
$url = "https://www.walmart.com/cservice/ProcessShoppingCard.do";
//
$h = curl_init();
curl_setopt($h, CURLOPT_URL, $url); 
curl_setopt($h, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($h, CURLOPT_POST, true);
curl_setopt($h, CURLOPT_POSTFIELDS, "cardNumber=1234567890123456&pin=1234&GetCardBalance.x=90&GetCardBalance.y=8");
curl_setopt($h, CURLOPT_HEADER, true);
curl_setopt($h, CURLOPT_RETURNTRANSFER, true);
//
$result = curl_exec($h);
echo $result;

*/

<?php


//Signature Base String
//<HTTP Method>&<Request URL>&<Normalized Parameters>
$base = rawurlencode("GET")."&";
$base .= "http%3A%2F%2Fplatform.fatsecret.com%2Frest%2Fserver.api&";

//sort params by abc....necessary to build a correct unique signature
$params = "format=json&";
$params .= "method=recipe.get&";

$params .= "oauth_consumer_key=4d7aafe8c2bb44e39c716cbead1f8c3d&"; // ur consumer key
$params .= "oauth_nonce=123&";
$params .= "oauth_signature_method=HMAC-SHA1&";
$params .= "oauth_timestamp=".time()."&";
$params .= "oauth_version=1.0&";

$params .= "recipe_id=".urlencode($_GET['recipe_id']);
//$params .= "&format=json";
$params2 = rawurlencode($params);
$base .= $params2;

//encrypt it!
$sig= base64_encode(hash_hmac('sha1', $base, "33cc603c4e33407da31c0d9ce1cc057e&", true)); // replace xxx with Consumer Secret


//now get the search results and write them down
$url = "http://platform.fatsecret.com/rest/server.api?".$params."&oauth_signature=".rawurlencode($sig);

$food_feed = file_get_contents($url);
$array = json_decode($food_feed, true);
echo '<pre>'; 
print_r($array);
//echo  "id: " . $array['recipes']['recipe'][0]['recipe_id'];

?>