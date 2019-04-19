var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "23rdmay1996",
  database:"todo1"
});

con.connect(function(err) {
  if (err) {console.log("Connection issue" + err);;throw err};
  console.log("Connected!");
  // var sql = "CREATE TABLE users (first_name VARCHAR(255),last_name VARCHAR(255),email_id VARCHAR(255),password VARCHAR(255),mobile_number VARCHAR(255),token VARCHAR(255))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });  
});



module.exports={con};