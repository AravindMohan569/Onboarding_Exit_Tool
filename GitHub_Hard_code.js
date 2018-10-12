var github = require('octonode');
var fetch = require('node-fetch');
var http = require('http');



    

    var client = github.client('ENTER_YOUR_GITHUB_TOKEN');

    //var invite_url_part = 'https://api.github.com/orgs/advancedcsg/members';
    var j=0;
    var i=0;
    

    
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
            console.log('i:'+i+'  j:'+j+'   '+data[key].login);
            console.log('\n'+ url)
            console.log("my pages", data.length);
            j++;
          }

         
        })
      })
    

  



    // )
    
