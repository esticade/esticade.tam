// Esticade.tam - Esticate Testing and Monitoring Instrument
var serviceName = "Esticade.tam";
var moment = require('moment');
var util = require('util');
const chalk = require('chalk');
var hashids = require("hashids")('gfEzfseqw5we');
var express = require('express');

function consoleLog(message) {
    console.log(chalk.dim(moment().format('llll')) + ' ' + message);
}

// Initialize Express.js and socket.io
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/public/static'));

app.get('/', function(req, res) {
    res.render("optimal", {});
});

var server = http.listen(2149, function() {
    var port = server.address().port;
    consoleLog(chalk.green(serviceName) + ', listening on port ' + chalk.green(port));
});

// Listen for Esticade events, publishing to each instance
var service = require("esticade")(serviceName);
service.alwaysOn('#', (event) => {
    var payload = {
        service: event.service,
        event: event.name,
        message: event.body
    };
    io.emit('gotEvent', {payload: payload}); // Emitting socket event to everyone
    consoleLog(chalk.bgYellow('Everyone') + ' Socket event gotEvent emitted with payload: \n' + util.inspect(payload, {showHidden: false, depth: null, colors: true}));
});

// Establish connection between client and server utilizing socket.io
io.on('connection', function(socket) {
    var client = chalk.bgYellow('Client ' + hashids.encode(moment().format('x'))) + ' ';
    consoleLog(client + 'Socket connected');
    socket.on('emitEvent', (data) => {
        try {
            var payload;
            try {
                payload = JSON.parse(data.payload);
            } catch (err) {
                payload = data.payload;
            }

            service.emit(data.emitEvent, payload);
            consoleLog(client + 'Esticade event ' + chalk.magenta(data.emitEvent) + ' emitted with payload: \n' + util.inspect(payload, {showHidden: false, depth: null, colors: true}));
        } catch (err) {
            socket.emit('failure', err.stack);
            consoleLog(client + chalk.bgRed('Error happened: ' + err.stack));
        }
    });
    socket.on('ping', function(data) {
        consoleLog(client + chalk.bgCyan(data));
    });
    socket.on('disconnect', function() {
        consoleLog(client + chalk.red('disconnected'));
    });

    consoleLog('Sockets restarted');
});
