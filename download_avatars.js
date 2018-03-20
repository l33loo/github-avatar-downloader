var request = require('request');
var githubToken = require('secrets');


console.log("welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': githubToken
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}


getRepoContributors('jquery', 'jquery', function(err, result) {
  console.log("errors:", err);
  console.log("Result:", result);
});

  // request.get('https://api.github.com/repos/jquery/jquery/contributors')

// https://api.github.com/users/lighthouse-labs
// :owner and :repo are jquery
// "avatar_url

//jquery API to interact with the DOM