// Esticade.tami client side, needs to be compiled with browserify
$ = jQuery = require('jquery');
var moment = require('moment');
var socket = require('socket.io-client')();
var util = require('util');
var Convert = require('ansi-to-html');
var convert = new Convert({escapeXML: true});
var Str = require('string');
var ace = require('brace');

function consoleLog(message) {
    console.log(moment().format('llll') + ' ' + message);
}

function filter() {
    var value = $("#filter").val().toLowerCase();
    $("li").each(function() {
        var element = $(this);
        if (value == '' || (value && element.text().toLowerCase().indexOf(value) > -1)) {
            element.show();
        } else {
            element.hide();
        }
    });
}

// Initiate Ace Editor
require('brace/mode/json');
require('brace/theme/merbivore_soft');
var editor = ace.edit('json-editor');
editor.getSession().setMode('ace/mode/json');
editor.setTheme('ace/theme/merbivore_soft');
editor.clearSelection();

// socket.io integration
socket.emit('ping', "Client joining");
var esticadeEvents = $("#esticadeEvents");

socket.on('gotEvent', function(data) {
    esticadeEvents.append(
        '<li class="list-group-item" style="color:#FFF; background-color: rgba(0, 20, 0, 0.7)">' +
        convert.toHtml(util.inspect(data.payload, {showHidden: false, depth: null, colors: true})) +
        '</li>'
    );
    consoleLog('Socket event gotEvent was caught with payload: ' + JSON.stringify(data.payload));
    filter();
});

socket.on('failure', function(data) {
    $("#error-message").html(
        '<div class="alert alert-danger alert-dismissible" role="alert">' +
        '<strong>Error!</strong><br>' + Str(data).replaceAll('\n', '<br>').s + '<div>'
    );

    $("#error-message").fadeTo(5000, 500).slideUp(1000, function(){
        $("#error-message").hide();
    });
});

$("#emit").click(function(event) {
    esticadeEvents.empty();
    var eventMessage = {
        emitEvent: $('#emitEvent').val(),
        payload: editor.getValue()
    };

    socket.emit('emitEvent', eventMessage);
    consoleLog('Socket event emitEvent was emitted with payload: ' + JSON.stringify(eventMessage));
    event.preventDefault();
});

$("#emitEvent").keydown(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        $("#emit").click();
        return false;
    }
});

$("#flush").click(function(event) {
    esticadeEvents.empty();
    consoleLog('esticadeEvents flushed!');
    event.preventDefault();
});

$("#filter").keyup(function (event) {filter();});
