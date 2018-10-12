var request = require('request');

var JIRA_username;
var user;
var GetEmailIdFromTextBox='sushma.ramesh@oneadvanced.com';
var options_getuser = {
   method: 'GET',
   url: 'https://acs-sandbox.atlassian.net/rest/api/3/user/search?query='+GetEmailIdFromTextBox,
   auth: { username: 'aravind.mohan@oneadvanced.com', password: 'ENTER_YOUR_JIRA_TOKEN' }
}
//console.log(res);

request(options_getuser, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(
       'Response: ' + response.statusCode + ' ' + response.statusMessage
    );
    var simple =JSON.parse(body)
    JIRA_username=simple[0].name;
    console.log(JIRA_username);
    delete_user(JIRA_username);
 });

 function delete_user(user)
 {
     var check_string='https://acs-sandbox.atlassian.net/rest/api/3/user?user_name='+user;
     console.log(check_string)
console.log(user);
 var options_delete = {
    method: 'DELETE',
    url: 'https://acs-sandbox.atlassian.net/rest/api/3/user?username='+user,
    auth: { username: 'aravind.mohan@oneadvanced.com', password: 'ENTER_YOUR_JIRA_TOKEN' }
 };
 
 request(options_delete, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(
       'Response: ' + response.statusCode + ' ' + response.statusMessage
    );
    console.log(body);
 });
 
}


// request(options, function (error, response, body)
// {
//    request.json().then(json=>{
//       var data = json;
      
//         console.log(data.key);
//        // request.query("INSERT INTO GitHub_ActiveUsers_List (GitHub_ID_API) values ('"+data[key].login+"')")
       
//     })
// })

// request(options, function (error, response, body) {
//    if (error) throw new Error(error);
//    console.log('Response: ' + response.statusCode + ' ' + response.statusMessage);
//    console.log(body);
// });
