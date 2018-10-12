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
        const workbook = XLSX.readFile('D:\Employee_Details.xlsx');
        const sheet_name_list = workbook.SheetNames;
        var data = (XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
        request.query("truncate table Employee_Details")
        console.log("Table cleaned !")
        for(i=0;i<data.length;i++) 
        {
          empID=(data[i]['employee_ID']);
          emailID=(data[i]['email_ID']);
          GitHubID=(data[i]['github_ID']);
          console.log(empID);
          console.log(emailID);
          console.log(GitHubID);
          await request.query("INSERT INTO Employee_Details (employee_ID,email_ID,github_ID) values ('"+empID+"','"+emailID+"','"+GitHubID+"')")
        }

        }
      })
    }




   
  
  
  
