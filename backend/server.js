const app = require("./app");
const dotenv = require("dotenv");
const connection = require("./database/database");

// Database connection
connection();

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`The server  listening on ${PORT}`);
});
