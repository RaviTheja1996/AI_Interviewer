const express = require("express");
require("dotenv").config();
const { connection } = require("./db");

const app = express();

app.listen(process.env.PORT, () => {

})