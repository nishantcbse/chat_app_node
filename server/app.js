const cors = require('cors')();
let debug = require('debug')('app.js'),
 express = require('express'),
 app = express(),
 morgan      = require('morgan'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 methodOverride = require('method-override');
 app.enable('trust proxy');
require('dotenv').config();
const bluebird = require('bluebird');
const port = process.env.PORT;
global.fs = bluebird.promisifyAll(require("fs"));
global.mysql = require('./models/mysql');
global.users = {};
global.messages = {};
app.use(morgan('dev'));
app.use(cookieParser()); 
app.use(express.static(__dirname + '/public'));
app.use(cors);
app.options('*', cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
 

app.use(require("./libs/express-router"));
let server = require('http').createServer(app);
const io = require("socket.io").listen(server);
require('./libs/server')(io)

var exports = module.exports = {};

server.listen(port, ()=>{
  console.log('App listening on port', port);
});
debug("App listening on: http://127.0.0.1:" + port);
exports.closeServer = function(){
  server.close();

};
exports.listeningPort = 'http://localhost:'+port