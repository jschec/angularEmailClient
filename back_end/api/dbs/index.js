import mysql from "mysql";

var connection = mysql.createConnection({
    host: 'localhost',
    //user: 'web_svc',
    //password: 'CS410',
    user: "root",
    password: "Venalie1996!",
    database: 'email_client'
  })
  
  connection.connect();

  export default connection;