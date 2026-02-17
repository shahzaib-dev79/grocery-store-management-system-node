const { json } = require("body-parser");
const express = require("express");
const app = express();
const port = 5000;

app.use(express(json()));

app.listen(port, () => {
	console.log("App is up and running on port", port);
});
