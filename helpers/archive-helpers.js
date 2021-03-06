var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var htmlfetcher = require('../workers/htmlfetcher');
var handler = require('../web/request-handler');
var http = require('http');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(webSiteName, cb) {
  fs.readFile(__dirname + '/../archives/sites.txt', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    var arrayUrls;
    //generate array of Urls, split on every line, and trim off stringify quotes (first and last items have extra quote)
    arrayUrls = JSON.stringify(data);
    arrayUrls = (arrayUrls.split('\\n'));

    arrayUrls[0] = arrayUrls[0].slice(1, ( arrayUrls[0].length ));

    arrayUrls[arrayUrls.length - 1] = arrayUrls[arrayUrls.length - 1].slice(0, ( arrayUrls[arrayUrls.length - 1].length - 1 ));
    exports.isUrlInList(webSiteName, arrayUrls, cb);

  });
};

exports.isUrlInList = function(webSiteName, listOfUrls, cb) {
  if ( listOfUrls.indexOf(webSiteName) === -1 ) {
    exports.downloadUrls(webSiteName, cb);
    // if it's not there
      //call downloadUrls
        //send back loading.html
  } else {
    // call isUrlArchived
    exports.isUrlArchived(webSiteName, cb);
  }
};

exports.addUrlToList = function(webSiteName) {
  fs.appendFile(__dirname + '/../archives/sites.txt', '\n' + webSiteName, (err) => {
    if (err) {
      console.log('ERROR');
    }
  });

};

exports.isUrlArchived = function(webSiteName, cb) {
  fs.readFile(__dirname + '/../archives/sites/' + webSiteName, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    cb(data);
  });
};

exports.downloadUrls = function(webSiteName, cb) {
  htmlfetcher(webSiteName);

  fs.readFile(__dirname + '/../web/public/loading.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    cb(data);
  });

};
