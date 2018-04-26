/** @namespace socket.decoded_token */
const cors = require('cors')();
const debug = require('debug')('server.js')
const express = require('express');
const app = express();
app.enable('trust proxy');
require('dotenv').config();
const bluebird = require('bluebird');
global.fs = bluebird.promisifyAll(require("fs"));
const bodyParser = require('body-parser');
global.publicDir = __dirname + "/public/";
global.mysql = require('./models/mysql');
app.use(cors);
app.options('*', cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/img', express.static(__dirname + "/public/img"));
app.use(require("./libs/express-router"));
let server = require('http').createServer(app);
const io = require("socket.io").listen(server);
require("./libs/server")(io);
process.on('unhandledRejection', r => console.log(r));
server.listen(process.env.PORT, function () {
    console.log("Listening on " + process.env.PORT);
});
debug("App listening on: http://127.0.0.1:" + process.env.PORT);
var exports = module.exports = {};
exports.closeServer = function(){
  server.close();
};

exports.listeningPort = 'http://localhost:'+process.env.PORT