var request = require('request');
var expect = require('expect.js');
var should = require('should');
var Q = require('q');






/*API Specifications:

API Point: /translate
Method: GET

parameters: 	latlng:	string, latlng google coordinate. e.g. '27.123412,3.145219'
		lang:	string, language code (2 letters) of the translated address. e.g. 'en' 

Example: "http://37.59.136.48:3000/translate?latlng=3.14879,101.707644&lang=en"

results:
	JSON object:
		latlng: string
		lang: string
		translation: string, the translated address
		status: the result code of the request
	Codes:
		200: no error
		400: bad request
		500: server error
		status:
			0: no error
			-1: unknown error
			1: no address available for provided latlng 

*/

/* TIPS:
	Status code of the response can be found in res.statusCode
*/
			

describe('/translate API Point test', function(){
	this.timeout(30000);
	var host = 'http://37.59.136.48:3000';
	var apiPoint = '/translate';
	var url = host + apiPoint;

	var goodlatlng = '3.14879,101.707644';
	var badlatlng = '500.999,900.999';

	var goodlang = 'en';


	it('should fail if all parameters are empty', function(done){
		/*
			Means that server will not send back a 200 status code
		*/

		var req = url + "?latlng=&lang=";

		request(req, function(err, res, body){
			
			//Assertion here Status code of the response can be found in res.statusCode

			done();
		});
	});

	it('should fail if one parameter is missing', function(done){
		/*
			Means that server will not send back a 200 status code
		*/

		var latlng = '23.6, 34.5';

		var req = url + "?latlng=" + latlng;

		request(req, function(err, res, body){
			
			//Some assertions

			done();
		});
	});

	it('should fail if parameters are incorrect', function(done){
		var latlng = '23.6, 34.5';
		var lang = 'en';
		var req = url + "?latlng=" + lang + '&lang=' + latlng;

		request(req, function(err, res, body){

			//Assertions

			done();
		});
	});

	it('should success to give back the correct gps coordinates', function(done){
		/*
			TIP: json response object is in "result" variable
		*/

		var req = url + "?latlng=" + goodlatlng + '&lang=' + goodlang;

		request(req, function(err, res, body){

			var result = JSON.parse(body);
			//Some assertions
			done();
		});
	});

	it('should success to give back the correct translation given correct gps coordinates', function(done){


		var req = url + "?latlng=" + goodlatlng + '&lang=' + goodlang;

		request(req, function(err, res, body){

			var result = JSON.parse(body);
			//Some assertions
			done();
		});
	});

	it('should fail to give back the correct translation given incorrect gps coordinates', function(done){


		var req = url + "?latlng=" + badlatlng + '&lang=' + goodlang;

		request(req, function(err, res, body){

			var result = JSON.parse(body);
			//Some assertions
			done();
		});
	});

});