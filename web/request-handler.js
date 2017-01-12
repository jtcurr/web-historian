var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var qs = require('querystring');



exports.handleRequest = function (req, res) {
  console.log('Serving request for ' + req.url + ' of method ' + req.method);
  if ( (req.url === '/' || req.url === '/index.html') && req.method === 'GET') {
    fs.readFile(__dirname + '/public/index.html', 'utf-8', (err, data) => {
      if (err) {
        throw err;
      }
      res.end(data);
    });
  }
  if ( req.url === '/styles.css' ) { 
    fs.readFile(__dirname + '/public/styles.css', 'utf-8', (err, data) => {
      if (err) {
        throw err;
      }
      res.end(data);
    });
  }
  if ( req.method === 'POST' ) {
    var urlInput = '';
    req.on ('data', (chunk) => {
      urlInput += chunk;
    });
    req.on ('end', () => {
      var data = qs.parse(urlInput);
      archive.readListOfUrls(data.url);
    });
  }
  // var urlSplit = req.url.split('.');
  // urlSplit = urlSplit[urlSplit.length - 1];
  if ( req.url.indexOf('.') === -1 && req.url !== '/') {
    console.log('got to undefined urlSplit');
    res.writeHead(404);
    res.end('Does not have appropriate number of .\'s!');
  }
  // res.end(archive.paths.list);
};
