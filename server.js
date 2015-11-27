var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var controllers = require('./app/server/controllers/movieController');



/*===============db connection establishment=====================*/
var dbName = 'sMovieApp';
//var dbUrl = 'mongodb://127.0.0.1:27017/'+dbName;
var dbUrl = 'mongodb://suman:suman@ds059634.mongolab.com:59634/mean_crud_app';
// mongoose.connect('mongodb://localhost/myapp');
mongoose.connect(dbUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connected to db:'+dbName);
});

/*===============db connection end=====================*/

app.use('/partials',express.static('./partials'));
app.use('/app',express.static('./app'));
app.use('/public',express.static('./public'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(7878,function(){
  console.log('server listening at http://localhost:7878');
});

app.get('/',function(req,resp){
  resp.sendFile(__dirname+'/index.html');
})


app.get('/api/user',controllers.getListOfMovies);
app.post('/api/user',controllers.addMovie);
app.delete('/api/user/:MongoID',controllers.deleteMovie);
app.get('/api/user/:MongoID',controllers.getMyData);
app.put('/api/user/:MongoID',controllers.updateMyData);
