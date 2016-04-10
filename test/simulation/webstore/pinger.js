// Generates a ping message after every 2 seconds

var util   = require('util');
var hashids = require("hashids")('tTgf7Qnp4Afj');

var serviceName = "Pinger-" + hashids.encode(Math.round(Math.random() * 10000000));
console.log("Starting " + serviceName);

var service = require("esticade")(serviceName);
setInterval(() => service.emit("Pinger", {text: "Very much pinging"}), 2000);
