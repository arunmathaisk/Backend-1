var fs = require('fs');
var mysql = require('mysql2');
// var myconfig = require('./myconfig.json');
if(! process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv").config()
}

function db_test() {
  let con = (process.env.db_ca && process.env.db_key && process.env.db_cert)? mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db,
    ssl: {
        ca: process.env.db_ca,  
        key: process.env.db_key,
        cert: process.env.db_cert
    }
}): mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db
});
  
    // con.connect(function(error) {
    //   if (error) {
    //     console.log("Error: Cannot connect to server: " + myconfig.host);
  
    //     if ("sqlMessage" in error) {
    //       console.log(error.errno + " : " + error.sqlMessage);
    //     } else {
    //       console.log(error);
    //     }
  
    //     return;
    //   }
  
    //   db_listDatabases(con);
    // });
      db_listDatabases(con);
  }
  
  function db_listDatabases(con) {
  //   con.query('SELECT * FROM sessions', function (error, results, fields) {
  //     if (error) {
  //       console.log("Error: Cannot query databases");
  
  //       if ("sqlMessage" in error) {
  //         console.log(error.errno + " : " + error.sqlMessage);
  //       } else {
  //         console.log(error);
  //       }
  
  //       con.end();
  
  //       return;
  //     }
  //     console.log(results);
  //     con.end();
  //   });

  // con.query("Select * from dark;", function(err, results, fields) {
  // con.query("Select quiz_list.id, c.name as companyName, quiz_list.quiz_id as quizName, quiz_list.quiz_time from quiz_list inner join company c on quiz_list.company_id = c.id where quiz_list.isActive=1;", function(err, results, fields) {
  con.query("update company set active = 0 where id = 1 and active= 1;", function(err, results) {
    if(err) {
      console.log("ERROR in QUERY");
      console.log(err);
      con.close();
    } else if (results) {
      // console.log(results);
      // const print = results.map(row => `${row.qno}:)  ${row.question} \nA)${row.op1}\tB)${row.op2}\nC)${row.op3}\tD)${row.op4}\n\tANS) ${JSON.parse(row.ans)}`)
      // console.log(print.join("\n\n\n"))

      //List all quiz
      // console.log(results);

      // Disable Company
      let { info } = results;
      info = info.split(":");
      if(info[1].includes('0') || info[2].includes('0')) {
        console.log("INCORRECT ID");
        console.log(results);
      } else if(info[1].includes('1') && info[2].includes('1')) {
        console.log(info[1].includes('1'));
        console.log(info[2].includes('1'))
        console.log("CHANGED");
        console.log(results);
      } else {
        console.log(info[1].includes('1'));
        console.log(info[2].includes('1'))
        console.log(results);
      }
      con.close();
    }
  });
  }
  
  db_test();