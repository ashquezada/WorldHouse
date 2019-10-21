var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var http = require('http');
var url = require('url'); 
var fs = require('fs');
var path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'cursos',
    password: 'password',
    database: 'worldhouse'
});
  
// connect to database
dbConn.connect(); 

// Retrieve all cursos 
app.get('/programas', function (req, res) {
  dbConn.query('SELECT * FROM cursos', function (error, results, fields) {
	if (error) throw error;
	res.send(results);
	console.log(results);
  });
});
 
 
// Retrieve cursos with id 
app.get('/programa/:id', function (req, res) {
  
    let curso_id = req.params.id;
  
    if (!curso_id) {
        return res.status(400).send({ error: true, message: 'Please provide curso_id' });
    }
  
    dbConn.query('SELECT * FROM cursos where id=?', curso_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'cursos list.' });
    });
  
});
 
 
// Add a new curso  
app.post('/programa', function (req, res) {
  
    let name = req.body.name;
    let nivel = req.body.nivel;
	let bibliography = req.body.bibliography;
	let days = req.body.days;
	let time = req.body.time;
  
    if (!name) {
        return res.status(400).send({ error:true, message: 'No pasa nada!'+name });
    }
  
    dbConn.query("INSERT INTO cursos SET ? ", { name: name, nivel: nivel, bibliography: bibliography, days: days, time: time }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New curso has been created successfully.' });
    });
});
 
 
//  Update cursos with id
app.put('/programa', function (req, res) {
  
    let curso_id = req.body.curso_id;
    let curso = req.body.curso;
  
    if (!curso_id || !curso) {
        return res.status(400).send({ error: curso, message: 'Please provide curso and curso_id' });
    }
  
    dbConn.query("UPDATE curso SET curse = ? WHERE id = ?", [curso, curso_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'curse has been deleted successfully.' });
    });
});
 
 
//  Delete attitude
app.delete('/programa', function (req, res) {
  
    let curso_id = req.body.curso_id;
  
    if (!curso_id) {
        return res.status(400).send({ error: true, message: 'Please provide curso_id' });
    }
    dbConn.query('DELETE FROM cursos WHERE id = ?', [curse_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'curse has been updated successfully.' });
    });
}); 
 
// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;
