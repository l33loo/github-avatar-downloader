var input = process.argv.slice(2);
var request = require('request');

// Make a request for JSON to get back a string representation of an array of GitHub repo contributors.
function getRepoContributors(repoOwner, repoName, cb) {

  // Make the function work only if the user inputs the repo owner and the repo name.
  if (repoOwner && repoName) {

    console.log('Welcome to the GitHub Avatar Downloader!');

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

    // If the user does not specify the repo owner and the repo name, print an error message.
    } else {
      console.log("Error: you need to specify the repository owner and the repository name, e.g., Lighthouse-labs iOS_Swift_1_Playground");
  }
}

// Download an image from a given URL into the given file path.
function downloadImageByURL(url, filePath) {
  var fs = require('fs');

  // Get the URL from the server.
  request.get(url)
    .on('error', function(err) {
      throw err;
    })

    // Pipe (write) the URL into a file.
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

  // Loop through each object.
  arr.forEach(function(element) {

    // Fetch each object's avatar.
    downloadImageByURL(element.avatar_url, './avatars/' + element.login + '.jpeg');

    // Print which image of how many is downloading.
    console.log('Downloading image ' + (arr.indexOf(element) + 1) + ' of ' + arr.length);
  });
}

// Invoke the function with the first two arguments provided by the user.
getRepoContributors(input[0], input[1], getAvatar);
