const mysql = require('mysql2');

const config = require('./config');
const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
});
// console.log(console.log('haha',connections.config))
connections.getConnection((err,conn)=>{
  if(err){
    console.log(err)
  }else{
    conn.connect((err)=>{
      if(err){
        console.log('连接失败', err)
      }else{
        console.log('连接成功')
      }

    })
  }
});


module.exports = connections.promise();
