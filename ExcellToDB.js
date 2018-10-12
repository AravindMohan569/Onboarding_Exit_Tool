const XLSX = require('xlsx');
const sql = require('mssql');
var github = require('octonode');
var fetch = require('node-fetch');

const config = {
  server : 'BLR-98T99R2-D',
  user : 'sa',
  password : 'W3lc0m3',
  database : 'ExcellToDb',
  options : { 
      encrypt:false
  }
}

excelToDb();
var j=1;
var request = new sql.Request();
async function excelToDb()
{
   sql.connect(config,async function(err){
      if(err) {
          console.log("error at SQL connection:",err);
      }
      else{
        
        console.log("Connected !");

        var i;
        var empID,emailID,GitHubID;
        const workbook = XLSX.readFile('D:\GitHubDummyData.xlsx');
        const sheet_name_list = workbook.SheetNames;
        var data = (XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
        // var csv = new CSV(data)
        request.query("truncate table Excell")
        console.log("Table cleaned !")
        for(i=0;i<data.length;i++) 
        {
          empID=(data[i]['Emp_ID']);
          emailID=(data[i]['Email_ID']);
          GitHubID=(data[i]['GitHub_ID']);
          console.log(empID);
          console.log(emailID);
          console.log(GitHubID);
          await request.query("INSERT INTO Excell (Emp_ID,Email_ID,GitHub_ID) values ('"+empID+"','"+emailID+"','"+GitHubID+"')")
        }
       // fetchdata(j)
      }
      fetchdata(j);
      compare();
      //sql.close();
    })

  }

  function fetchdata(j) 
{
  url = 'https://api.github.com/orgs/advancedcsg/members?page='+ j;
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
            j++;
            fetchdata(j);
          }
    })
  })
}

function compare()
{

  
}



   
  
  
  
