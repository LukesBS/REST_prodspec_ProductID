const mysql = require("mysql");
const dbConfig = require("../config/dbconfig.js");

// Erzeugen der Datenbankverbindung
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// Datenbankverbindung öffnen
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// Export der offenen Datenbanverbindung
module.exports = connection;
