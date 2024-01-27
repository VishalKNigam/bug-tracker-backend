const dbConnector = require("mongoose");
require("dotenv").config();

const databaseURL = process.env.DATABASE_URL;

dbConnector.connect(databaseURL, {
}).then(() => console.log("Connected to the database")).catch((error) => console.log("Error", error));
