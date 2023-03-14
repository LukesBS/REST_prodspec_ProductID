const mysql = require("mysql");
const dbConfig = require("../config/dbconfig.js");

// Erzeugen der Datenbankverbindung
const dbConfigPath = {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
};

var connection;
function handleDisconnect() {
  connection = mysql.createConnection(dbConfigPath); // Recreate the connection, since the old one cannot be reused.
  connection.connect(function onConnect(err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 10000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function onError(err) {
    console.log("db error", err);
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else if (err.code == "ECONNRESET") {
      handleDisconnect();
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}
handleDisconnect();

// Export der offenen Datenbanverbindung
module.exports = connection;
