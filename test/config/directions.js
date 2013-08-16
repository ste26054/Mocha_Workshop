var gm = require('googlemaps');
var util = require('util');
var _ = require('lodash');
var Q = require('q');
var http = require('http');


// gm.config('google-client-id', '116028008077');
gm.config('google-private-key', 'AIzaSyC8pMoS5Rv6dQb2-Ce4RoWG9j_g4Euasyk');


/*var languages = ['zh-CN','en','en-GB','fr'];
var pickup = '3.14879,101.707644';
var destination = '3.1352,101.66624999999997';
var translatedDescriptions = {};
var actualLength = 0;

var getTranslations = function(languages, pickup, destination){
	console.time('Function1');
	var d = Q.defer();
	 _.each(languages, function(lang){
		gm.reverseGeocode(pickup, function(err, data){

			gm.reverseGeocode(destination, function(err, data2){
				var description = {
					pickup: data.results[0].formatted_address,
					destination: data2.results[0].formatted_address
				};
				translatedDescriptions[lang] = description;
				actualLength = actualLength + 1;
				if(actualLength == languages.length)
				{
					d.resolve(translatedDescriptions);
					console.log('END !');
				}
			}, false, lang);

		}, false, lang);

	});
	 return d.promise;
};*/
/*var description = {
			pickup: data.results[0].formatted_address,
			destination: data2.results[0].formatted_address
		};
		translatedDescriptions[lang] = description;*/


/*gm.reverseGeocode(pickup, function(err, data){
	
	gm.reverseGeocode(destination, function(err, data2){
		
		gm.reverseGeocode(pickup, function(err, data3){
		
			gm.reverseGeocode(destination, function(err, data4){
				
				gm.reverseGeocode(pickup, function(err, data5){
		
					gm.reverseGeocode(destination, function(err, data6){
						
						var description = {
						pickup: data.results[0].formatted_address,
						destination: data2.results[0].formatted_address
						};
						translatedDescriptions['zh-CN'] = description;

						description = {
						pickup: data3.results[0].formatted_address,
						destination: data4.results[0].formatted_address
						};
						translatedDescriptions['en'] = description;

						var description = {
						pickup: data5.results[0].formatted_address,
						destination: data6.results[0].formatted_address
						};
						translatedDescriptions['fr'] = description;
						
					}, false, 'fr');

				}, false, 'fr');
				
			}, false, 'en');

		}, false, 'en');
		
	}, false, 'zh-CN');

}, false, 'zh-CN');
*/
/*getTranslations(languages, pickup, destination).then(function(){
	console.timeEnd('Function1');
	console.log("It's done");
	//console.log(translatedDescriptions);
});*/

/*exports.getAllTranslations1 = function(languages, pickup, destination, callback)
{
	getTranslations(languages, pickup, destination).then(function(){
		// console.timeEnd('Function1');
		// console.log("It's done");
		// console.log(translatedDescriptions);
		callback(translatedDescriptions);
	});
};*/


/*
var test = _.findIndex(languages, function(x){
	return x == 'e';
});

if(test)
{
	console.log('test equals: ', test);
}
else
{
	console.log('Not found');
}*/

/*var tests = function(){
	var d = Q.defer();
	setTimeout(function(){
		d.resolve('salut');
		console.log('TIMEOUT ENDED !');
	}, 5000);
	return d.promise;
}

tests().then(function(a,b,c){
	console.log('SHOULD WORK ?',a,b,c);
});*/

/*var httprequest = null;
var req = new XMLHttpRequest();
*/


// req.open("GET", "http://78.193.45.72:2081/api/random/", true);

/*var options = {
    host: '78.193.45.72',
    port: 20081,
    path: '/api/random/',
    method: 'GET'
  };

var req = http.get(options, function(response) {
	console.log(response.statusCode);
	response.on('data', function(res){
		 console.log(res);
	})
  });*/



// var languages = ['zh-CN','en','en-GB','fr','gu', 'be'];
var languages = ['zh','en','ar','eu','bg','bn','ca','cs','da','de','el','es','fa','fi','fil',
								'fr','gl','gu','hi','hr','hu','id','it','iw','ja','kn','ko','lt','lv','ml','mr','nl','nn',
								'no','or','pl','pt','rm','ro','ru','sk','sl','sr','sv','tl','ta','te','th','tr',
								'uk','vi'];

var lang1 = ['bg','en'];
var lang2 = ['ar', 'zh'];




var getAddress = function(latlng, lang)
{	
	var d = Q.defer();

		gm.reverseGeocode(latlng, function(err, data){

			if(data.status == 'OK')
			{
				 d.resolve(data.results[0].formatted_address);
			}
			else
			{
				d.reject("INVALID_STATUS_CODE");
			}
	}, false, lang);

	return d.promise;
};



var getPickupDestination = function(pickupA, destinationA, lang, translatedDescriptions, retryCount)
{
	var d = Q.defer();
	var i;

	if(retryCount)
	{
		i = retryCount;
	}
	else
	{
		i = 0;
	}
	var pickup = getAddress(pickupA, lang);
	var destination = getAddress(destinationA, lang);
	Q.allSettled([pickup, destination]).then(function(res){
		if(res[0].state == 'fulfilled' && res[1].state == 'fulfilled')
		{
			var description = {
						pickup: res[0].value,
						destination: res[1].value
					};
			translatedDescriptions[lang] = description;
			d.resolve(description);
		}
		else
		{
			

			i++;
			setTimeout(function(){
				d.resolve(getPickupDestination(pickupA, destinationA, lang, translatedDescriptions, i));
			},1500);
		}
		
	})
	return d.promise;
};

var pickup1 = '3.14879,101.707644';
var destination1 = '3.1352,101.66624999999997';

var pickup2 = '22.14879,114.207644';
var destination2 = '22.28495,114.1515703';

//var languages = ['zh-CN','en','en-GB','ar','eu'];

//var languages = ['zh-CN','en','en-GB','ar','eu','bg','bn','ca','cs','da','de','el','en-AU','es','eu','fa','fi','fil', 'fr','gl','gu','hi','hr','hu','id','it','iw','ja','kn','ko','lt','lv','ml','mr','nl','nn'];

var actualLength = 0;

var getAllTranslations = function(languages, pickup, destination, callback)
{
	var promises = [];
	var translatedDescriptions = {};
	_.each(languages, function(x){
			var resolve = getPickupDestination(pickup, destination, x, translatedDescriptions);
			promises.push(resolve);	
	});

	
		Q.allSettled(promises).then(function(res){
				callback(translatedDescriptions);
			});

};


exports.getAllTranslations = getAllTranslations;

/*getAllTranslations(languages, pickup, destination, function(res){
	console.log("DONE");
	console.log(Object.keys(res).length, ' Addresses translated.');
	console.log(res);
});*/




