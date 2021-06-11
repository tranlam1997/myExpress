const express = require("express");
const dotenv = require('dotenv');

const app = express();
dotenv.config();


app.use(express.json());  

app.use(express.urlencoded({ extended: true }));  

const db = require("./app/model");

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my app." });
});

require("./app/route/routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});