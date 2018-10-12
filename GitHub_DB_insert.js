var github = require('octonode');
var fetch = require('node-fetch');
var http = require('http');
const sql = require('mssql')

const config = {
    server : 'BLR-98T99R2-D',
    user : 'sa',
    password : 'W3lc0m3',
    database : 'GitHubCompare',
    options : { 
        encrypt:false
    }
}

    var client = github.client('ENTER_YOUR_GITHUB_TOKEN');

    sql.connect(config, (err)=>{
        if(err) {
            console.log("error at SQL connection:",err);
        }})

    var request = new sql.Request();
    var Git_Username;
    
    var i=1;
    url = 'https://api.github.com/orgs/advancedcsg/members?page='+ i;

      fetch(url, {
      method: "GET",
        headers: {
          Authorization: "Basic " + new Buffer.from('AravindMohan569' + ":" + 'ENTER_YOUR_GITHUB_TOKEN').toString("base64")
        }
      }).then(res=>{
        res.json().then(json=>{
          var data = json;

          for(var key in data) {
            {
             Git_Username = data[key].login;
             console.log(Git_Username);
            //request.query("INSERT INTO GitHubActiveUsers (GitHub_ID) values ('"+Git_Username+"')")
            }
          }
        })
      })
    
