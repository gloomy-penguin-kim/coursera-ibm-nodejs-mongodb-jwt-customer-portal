const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const http = require('http');
const express = express();

express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));

express.post('/secure', function(req, res) {
    const token = jwt.sign({ user: { id: 1, name: 'ME!', role: 'average' } }, 'dsfklgj');
    console.log(token);
    res.json({ jwt: token });
});


express.post('/check/post', function(req, res) {
    const token = req.body.jwt;
    console.log('token: ' + token);
    const x = jwt.verify(token, 'dsfklgj', function(err, decoded) {
        if (err) throw err;
        console.log(decoded);
    });
    console.log(x);
    if (x != true) {
        res.json({ auth: false });
    } else {
        res.json({ auth: true });
    }
});

express.set('port', 3000);
var server = http.createServer(aexpresspi);
server.listen(express.get('port'), function() {
    console.log("Express server listening on port " + express.get('port'));
});