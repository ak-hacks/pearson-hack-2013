/*global console, process*/
var express = require('express'),
    expr = express(express.logger()),
    fs = require('fs');

expr.configure(function() {
    expr.use(express.compress());
});

function sendFile(res, path, expires) {
    try {
        var scriptFile = fs.readFileSync(path),
            fileType = /css/.exec(path) ? 'text/css' : /js/.exec(path) ? 'text/javascript' : /img/.exec(path) ? 'image/png' : 'text/html';
        res.set({
            'Content-Type': fileType,
            'Cache-Control' : 'max-age=' + expires
        });
        res.send(scriptFile);
    } catch (e) {
        console.error(e);
        res.set('Content-Type', 'text/html');
        res.send(404, 'Oh no! We can\'t find what your are looking for');
    }
}

expr.get('/css/:file', function (req, res){
    var path, expires;
    path = 'src/main/webapp/css/' + req.params.file;
    expires = 30;
    sendFile(res, path, expires);
});

expr.get('/img/:file', function (req, res){
    var path, expires;
    path = 'src/main/webapp/img/' + req.params.file;
    expires = 30;
    sendFile(res, path, expires);
});

expr.get('/js/tests/:file', function (req, res){
    var path, expires;
    path = 'src/main/webapp/js/tests/' + req.params.file;
    expires = 30;
    sendFile(res, path, expires);
});

expr.get('/js/:file', function (req, res){
    var path, expires;
    path = 'src/main/webapp/js/' + req.params.file;
    expires = 30;
    sendFile(res, path, expires);
});

expr.get('/index.html', function (req, res){
    var path, expires;
    path = 'src/main/webapp/index.html';
    expires = 30;
    sendFile(res, path, expires);
});

expr.get('/:file', function (req, res){
    var path, expires;
    path = 'src/main/webapp/html/' + req.params.file;
    expires = 30;
    sendFile(res, path, expires);
});

var port = process.env.PORT || 5000;
expr.listen(port, function() {
    console.log("Listening on " + port);
});