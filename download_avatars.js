var request = require('request');
console.log("welcome to the GitHub Avatar Downloader!");

// Make a request for JSON, getting back a string representation of an array of contributors
function getRepoContributors(repoOwner, repoName, cb) {

  // Make token secret to outsiders.
  var githubToken = require('./secrets');

  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': 'githubToken',
      'json': 'true'
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

// Download an image from a given URL.
function downloadImageByURL(url, filePath) {
  var fs = require('fs');

  // GET request for url.
  request.get(url)
    .on('error', function(err) {
      throw err;
    })

    // Pipe (write) the url into a file.
    .pipe(fs.createWriteStream(filePath))

    // When the piping is done, print that the download in complete.
    .on('finish', function() {
      console.log('Download complete');
    });
}

// Callback function that saves the avatar image and prints which image of how many is downloading.
function getAvatar(err, str) {

  // Given that the reponse is a string, we need to parse it to convert it into an array of objects.
  var arr = JSON.parse(str);

  // Looping through each object.
  arr.forEach(function(element) {

    // To fetch each object's avatar.
    downloadImageByURL(element.avatar_url, "./avatars/" + element.login + ".jpeg");

    // Print which image of how many is downloading.
    console.log('Downloading image ' + (arr.indexOf(element) + 1) + ' of ' + arr.length);
  });
}

getRepoContributors('Lighthouse-labs', 'iOS_Swift_1_Playground', getAvatar);