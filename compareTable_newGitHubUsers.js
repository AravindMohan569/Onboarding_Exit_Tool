var github = require('octonode');
var fetch = require('node-fetch');
const sql = require('mssql');
//var alert=require("alert-node");

const config2 = {
  server : 'BLR-98T99R2-D',
  user : 'sa',
  password : 'W3lc0m3',
  database : 'ExcellToDb',
  options : { 
      encrypt:false
  }
}
// sql.close();
sql.connect(config2, (err)=>{
  if(err) {
      console.log("error at SQL connection:",err);
  }
 
var GitHub_ID
var Final_List_Insert
var request = new sql.Request();
console.log('Alive')
            //var data = 
request.query("SELECT * FROM GitHub_ActiveUsers_List LEFT OUTER JOIN Excell ON (GitHub_ActiveUsers_List.GitHub_ID_API = Excell.GitHub_ID) WHERE Excell.GitHub_ID IS NULL ",function (err,res){
     for(i=0;i<res.recordset.length;i++) 
    {
      //empID=(res[i]['Emp_ID']);
      //console.log(empID);
      Final_List_Insert=res.recordset[i].GitHub_ID_API;
      console.log(Final_List_Insert)
      request.query("INSERT INTO FinalListToBeUpdated (UserToBeUpdated) values ('"+Final_List_Insert+"')", function (err, result, fields) {
      })
  //  request.query("INSERT INTO FinalListToBeUpdated (UserToBeUpdated) values ('"+empID+"')")
    }
//sql.close();

    })
    
    
})