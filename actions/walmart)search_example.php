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
