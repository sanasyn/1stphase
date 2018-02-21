const express = require("express");
const bodyParser = require("body-parser")
const Client = require("pg")
const app = express();
const PORT = process.env.PORT || 8080;
const match = require("./helpers/match.js");
// require("./helpers/match.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/query", match.runQuery);


app.listen(PORT, function() {
   console.log("App listening on PORT " + PORT);
});