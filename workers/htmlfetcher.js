// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('http');
var until = require('util');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
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
      fs.open(__dirname + '/../archives/sites/' + webSiteName, 'w', (err, fd) => {
        if (err) {
          console.log('ERROR creating file for site');
        }
        fs.appendFile(__dirname + '/../archives/sites/' + webSiteName, content, (err) => {
          if (err) {
            console.log('Failed to write content to file!');
          }
        });
        archive.addUrlToList(webSiteName);
        fs.close(fd);
      });
    });
  });
  req.end();



};