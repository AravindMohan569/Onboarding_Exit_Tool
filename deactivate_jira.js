var request = require('request');

var options = {
   method: 'DELETE',
   url: 'https://acs-sandbox.atlassian.net/rest/api/2/group/user?username=deeksha.kini&groupname=jira-users',
   auth: { username: 'aravind.mohan@oneadvanced.com', password: 'ENTER_YOUR_JIRA_TOKEN' }
};

request(options, function (error, response, body) {
   if (error) throw new Error(error);
   console.log(
      'Response: ' + response.statusCode + ' ' + response.statusMessage
   );
   console.log(body);
});