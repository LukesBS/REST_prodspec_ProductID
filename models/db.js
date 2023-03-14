const mysql = require("mysql");
const dbConfig = require("../config/dbconfig.js");

const dbConfigPath = {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
};

var connection;
function handleDisconnect() {
  connection = mysql.createConnection(dbConfigPath);
  connection.connect(function onConnect(err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 10000);
    }
  });
  connection.on("error", function onError(err) {
    console.log("db error", err);
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else if (err.code == "ECONNRESET") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

module.exports = connection;
