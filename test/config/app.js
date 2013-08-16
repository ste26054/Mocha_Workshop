var express = require('express');
var gm = require('googlemaps');
var app = express();

app.get('/translate', function(req, res) { //API POINT
	var latlng = req.param('latlng');	//Getting values for latlng parameter
	var lang = req.param('lang');	//Getting values for lang parameter
	var statusCode = 200;
	var error = false;

	res.type('application/json');
	var output = {	//Setting up the output object
	 	latlng: latlng,
	 	lang: lang,
	 	translation: '',
	 	status: null
	};
	if(latlng != null && latlng.length > 0) //Testing about latlng object
	{
		var floatRegex='([+-]?\\d*\\.\\d+)(?![-+0-9\\.])';
      	var commaRegex='(,)';	
      	var p = new RegExp(floatRegex+commaRegex+floatRegex,["i"]); //Some regex matching against float,float

	      var m = p.exec(latlng);
	      if (m == null)	//Error if no match
	      {
	      	statusCode = 400;
	      	error = true;
	      }
	}
	else if(latlng == null || lang == null || latlng.length == 0
		|| lang.length == 0 || lang.length > 2 )	//Other parameters checking
	{
		statusCode = 400;
		error = true;
	}


if(error == true)
{
	res.statusCode = statusCode;
	res.send(JSON.stringify(output));
}
else	//Parameters are correct
{
		gm.reverseGeocode(latlng, function(err, data){	//Call to google api
			if(data.status == 'OK')
			{
				output.translation = data.results[0].formatted_address;
				output.status = 0;
			}
			else if(data.status == "ZERO_RESULTS")
			{
				output.status = 1
			}
			else
			{
				output.status = -1;
			}
			console.log(output);
			res.send(JSON.stringify(output));

	}, false, lang);
}



});

app.listen(process.env.PORT || 3000);