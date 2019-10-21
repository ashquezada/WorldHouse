var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // me arma los archivos desde msql a json
var http = require('http');
var url = require('url'); 
var fs = require('fs');
var path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "../frontend")));

function any_error(rout, res){
	fs.stat(rout, error => {
		if (!error) {
		  	fs.readFile(rout, (error,contenido) => {
			if (error) {
			  res.writeHead(500, {'Content-Type': 'text/plain'});
			  res.write('Error interno');
			  res.end();					
			} else {
			  res.writeHead(200, {'Content-Type': 'text/html'});
			  res.write(contenido);
			  res.end();
			}
		  });
		} else {
		  res.writeHead(404, {'Content-Type': 'text/html'});
		  res.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');	
		  res.end();
		}
	});
}

// default route
app.get('/', function (req, res) {
  const objetourl = url.parse(req.url);
  let camino=objetourl.pathname;
  if (camino=='/')
    camino='../frontend/views/index.html';
  	any_error(camino, res);
});

// Retrieve all cursos 
app.get('/programas', function (req, res) {
  const objetourl = url.parse(req.url);
  let camino=objetourl.pathname;
  if (camino=='/programas')
    camino='../frontend/views/programa.html';
    any_error(camino, res);
});

app.get('/alumnos', function (req, res) {
  const objetourl = url.parse(req.url);
  let camino=objetourl.pathname;
  if (camino=='/alumnos')
    camino='../frontend/views/alumnos.html';
    any_error(camino, res);
});


// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;
