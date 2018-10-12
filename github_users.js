var github = require('octonode');
var fetch = require('node-fetch');
const sql = require('mssql');

const config = {
  server : 'BLR-98T99R2-D',
  user : 'sa',
  password : 'W3lc0m3',
  database : 'ExcellToDb',
  options : { 
      encrypt:false
  }
}

sql.connect(config, (err)=>{
  if(err) {
      console.log("error at SQL connection:",err);
  }
var i=1;
fetchdata(i);
var request = new sql.Request();
function fetchdata(i) 
{
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
            console.log(data[key].login);
            request.query("INSERT INTO GitHub_ActiveUsers_List (GitHub_ID_API) values ('"+data[key].login+"')")
          }
          if(data.length == 30) {
            i++;
            fetchdata(i);
          }
    })
  })
}
})