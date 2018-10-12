var express = require('express');
var app = express();
const sql = require('mssql')
var http = require('http');
var github = require('octonode');
var fetch = require('node-fetch');
var express = require('express');
var datetime = require('node-datetime');
const jsdom = require("jsdom");
var bodyParser = require("body-parser");
var alert=require("alert-node");
var JSAlert = require("js-alert");
//var pg = require('pg');
var request = require('request');


const config = {
    server : 'BLR-98T99R2-D',
    user : 'sa',
    password : 'W3lc0m3',
    database : 'ExcellToDb',
    options : { 
        encrypt:false
    }
}



app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile("index.html", {"root": '.'});
});

app.post('/GITHUBdelete', function (req, res) {

    var E_id = req.body.Emp_ID;
    // const getPhonebook = () => {
    //     try {
    //       console.log("\n setting up SQL connections...")
    //       sql.close();
    sql.connect(config, (err)=>{
    if(err) {
    console.log("error at SQL connection:",err);
    }
               console.log("\n Connected to the DB!")
               var testing=Convert.toString(E_id);
                              
               console.log('E_id'+ E_id)
               console.log('testing'+ testing)
               try{
               var query_manual='select github_ID from Employee_Details where employee_ID='+E_id;
               }
               catch(err)
               {
                   console.log('error :::xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx '+err)
               }
               console.log('Query : '+query_manual)
               var request = new sql.Request();
              
               var data = request.query(query_manual, (error, result)=>{ 
                   if(error)
                   {
                       console.log("error at Query: ",error);
                   }           

                  if(result.recordset.length==0)
                  {
                  alert("Check the Employee-ID");
                  }
                  else
                  {
                      console.log('Data present');
                  }

                  result.recordset.map(record=>{
                    
                  console.log("\n NAME :",record.github_ID) 
                  
      var client = github.client('ENTER_YOUR_GITHUB_TOKEN');
      var invite_url_part = 'https://api.github.com/orgs/advancedcsg/memberships/';
      var member_name = record.github_ID;
      var final_url = "\'"+[invite_url_part]+[member_name]+"\'";
      url='https://api.github.com/orgs/advancedcsg/members/'+member_name; 
        fetch(url, {
        method: "DELETE",
       
        headers: {
         Authorization: "Basic " + new Buffer.from('AravindMohan569' + ":" + 'ENTER_YOUR_GITHUB_TOKEN').toString("base64")
        },
       
      }).then(function(response) {
      
      
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n')
        console.log(' Response status: ' + response.status)
        console.log(' Status Text: ' + response.statusText)
        if(response.status==200||response.status==204){
        console.log(' GitHub ID : ' + member_name + ' has been removed from advancedcsg')
        alert(member_name+' has been removed from advancedcsg in GitHub');
        }
        else{
        alert(member_name+' was not found in advancedcsg (GitHub)');
        }
        
        console.log(' Status Text: ' + final_url)
        console.log('\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
     
        var log_date_time = datetime.create();
        var date_insert = log_date_time.format('d-m-y');
        var time_insert = log_date_time.format('H:M:S');
        //request.query("INSERT INTO log_audit (date,time,status,comment) values ('"+date_insert+"','"+time_insert+"','"+response.status+"','DELETE : "+invite_url_part+member_name+"')", function (err, result, fields) {
          
          if (err) throw err;
          {
          console.log('\n\t\t log_audit updated !');
          sql.close();
          console.log('\n\t\t sql connection closed');
          }
        });
       })         
      })
     })
    })
      
        
            
  
app.post('/JIRAdelete', function (req, res) {
console.log(" Inside //JIRAdelete");

var JIRA_username;
// var user;
var GetEmailIdFromTextBox=req.body.JiraDelete_emailID;
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
    if(simple.length>0)
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
    if(response.statusCode==200||response.statusCode==204)
    {
        console.log("Inside if(200||204)")
    console.log(user + ' has been deleted from JIRA')
    alert(user+' has been deleted from JIRA');
    }
    else
    {
    alert('e-mail ID does not exist');
    }

 });
 
}

})

app.post('/GITHUBinvite', function (req, res) {
    console.log(" Inside //GITHUBinvite");

    var InviteName = req.body.Invite_ID;

    url =  'https://api.github.com/orgs/advancedcsg/memberships/'+InviteName; 
    fetch(url, {
    method: "PUT",
   
    headers: {
     Authorization: "Basic " + new Buffer.from('AravindMohan569' + ":" + 'ENTER_YOUR_GITHUB_TOKEN').toString("base64")
    },
   
  }).then(function(response) {
  
  
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n')
    console.log(' Response status: ' + response.status)
    console.log(' Status Text: ' + response.statusText)
    if(response.status==(200||204))
        {
        console.log(' GitHub ID : ' + InviteName + ' Invite has been sent')
        alert('GitHub invite has been sent to '+InviteName);
        }
        else
        {
        alert(InviteName+' is invalid');
        }
    console.log(' Invite has been sent to GitHub ID : ' + InviteName + ' successfully')
    
    console.log('\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    sql.close();
    console.log('\n\t\t sql connection closed');
  
  })


})

// function log_audit_db(type_of_action)
// {
//     var log_date_time = datetime.create();
//     var date_insert = log_date_time.format('d-m-y');
//     var time_insert = log_date_time.format('H:M:S');
//     request.query("INSERT INTO log_audit (date,time,status,comment) values ('"+date_insert+"','"+time_insert+"','"+response.status+"','DELETE : "+invite_url_part+member_name+"')", function (err, result, fields) {
      
//       if (err) throw err;
//       {
//       console.log('\n\t\t log_audit updated !');
//       sql.close();
//       console.log('\n\t\t sql connection closed');
//       //alert('Log updated');
//       }
// }

var server = app.listen(5003, function () {
    console.log('Node server is running..');
});
