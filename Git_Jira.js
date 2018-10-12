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
var request = require('request');

const config = {
    server : 'BLR-98T99R2-D',
    user : 'sa',
    password : 'W3lc0m3',
    database : 'Phonebook',
    options : { 
        encrypt:false
    }
}

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile("index.html", {"root": '.'});
});
//app.post('/submit-student-data', function (req, res) {
app.post('/', function (req, res) {

    
    var name = req.body.e_ID;
    
    const getPhonebook = () => {
        try {
          console.log("\n setting up SQL connections...")
          sql.close();
          sql.connect(config, (err)=>{
              if(err) {
                  console.log("error at SQL connection:",err);
              }
              console.log("\nConnected to the DB!")
              var query_manual_github='select name from book where no='+name;
              var request = new sql.Request();
              
              var data = request.query(query_manual_github, (error, result)=>{ 
                //   if(error){
                //       console.log("error at Query: ",error);
                //   }           
                  if(result.recordset.length==0)
                  {
                  alert("Please check the Employee-ID");
                  }
                  else{
                      console.log('Data present');
                  }

                  result.recordset.map(record=>{
                    
                  console.log("\n NAME :",record.name) 
                  
      
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
      var client = github.client('ENTER_YOUR_GITHUB_TOKEN');
      var invite_url_part = 'https://api.github.com/orgs/advancedcsg/memberships/';
      var member_name = record.name;
      var final_url = "\'"+[invite_url_part]+[member_name]+"\'";
      url =  'https://api.github.com/orgs/advancedcsg/members/'+member_name; 
        fetch(url, {
        method: "DELETE",
       
        headers: {
         Authorization: "Basic " + new Buffer.from('AravindMohan569' + ":" + 'ENTER_YOUR_GITHUB_TOKEN').toString("base64")
        },
       
      }).then(function(response) {
      
      
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n')
        console.log(' Response status: ' + response.status)
        console.log(' Status Text: ' + response.statusText)
        if(response.status==(200||204)){
        console.log(' GitHub ID : ' + member_name + ' has been removed from advancedcsg')
        alert(member_name+' has been removed from advancedcsg in GitHub');
        //res.sendFile("index3.html", {"root": '.'});
        }
        else{
        alert(member_name+' was not found in advancedcsg (GitHub)');
        }
        
        // else{
        //     res.sendFile("index_bad.html", {"root": '.'}); 
        // }

        console.log(' Status Text: ' + final_url)
        console.log('\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        

///////////////////////////////////////JIRA DELETE////////////////////////////////////////////

/*        var request = require('request');

var options = {
   method: 'DELETE',
   url: 'https://acs-sandbox.atlassian.net/rest/api/3/user?user_name=Rukiyath.Faheema',
   auth: { username: 'aravind.mohan@oneadvanced.com', password: 'ENTER_YOUR_JIRA_TOKEN' }
};

request(options, function (error, response, body) {
   if (error) throw new Error(error);
   console.log(
      'Jira Response: ' + response.statusCode + ' ' + response.statusMessage
   );
   console.log(body);
});
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////
      
        //Entering into Log Database
        var log_date_time = datetime.create();
        var date_insert = log_date_time.format('d-m-y');
        var time_insert = log_date_time.format('H:M:S');
        request.query("INSERT INTO log_audit (date,time,status,comment) values ('"+date_insert+"','"+time_insert+"','"+response.status+"','DELETE : "+invite_url_part+member_name+"')", function (err, result, fields) {
          
          if (err) throw err;
          {
          console.log('\n\t\t log_audit updated !');
          sql.close();
          console.log('\n\t\t sql connection closed');
          //alert('Log updated');
          }
        });
      
      
        //END of Entering into Logs Database
      
      })
      
      
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
      
                  
                  })
              })
          })
        } catch (e) {
          console.error(e.message)
          throw new Error('getPhonebook failed.')
        } 
      }
      
      try {
        getPhonebook()
      } catch (e) {
        console.error(e.message)
      }



     

    //------------------------------------------------------------------------------------------------------------------//
});

var server = app.listen(5001, function () {
    console.log('Node server is running..');
});
