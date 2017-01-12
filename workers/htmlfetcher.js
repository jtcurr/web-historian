// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('http');
var until = require('util');
module.exports = function (webSiteName) {
  // go to webSiteName
    //retrieve the HTML
    //add a new file in sites (with webSiteName as name)
      //make a new file (webSiteName.html) inside webSiteName folder
  var options = {
    host: webSiteName,
    port: 80,
    path: '/'
  };
  var content = '';
  var req = http.get(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      content += chunk;
    });

    res.on('end', function () {
      until.log('hello');
      // until.log(content);
    });
  });
  req.end();






  // var htmlFetched = $('html').load(webSiteName);
  // console.log(htmlFetched);



};