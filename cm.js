// Esticade-TAM Console Monitor, listens for all the events

var colors = require('colors/safe');
var util   = require('util');
var hashids = require("hashids")('owVgaTkf56Hd');
var args = process.argv.slice(2);

var serviceName = "Esticade-TAMCM-" + hashids.encode(Math.round(Math.random() * 10000000));
console.log(colors.yellow("Starting " + serviceName));

var service = require("esticade")(serviceName);
service.on('#', function(event) {
    var payloadObject = {
        event: event.name,
        message: event.body
    };

    console.log(colors.green(util.inspect(payloadObject, {showHidden: false, depth: null, colors: false})));
});
