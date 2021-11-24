console.log("UP AND RUNNING");

let express = require("express");

let app = express();

let port = 3000;

let server = app.listen(port);

console.log("SERVER IS RUNNING ON http://localhost:" + port);

app.use(express.static("public"));
