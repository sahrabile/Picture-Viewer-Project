var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var port = 3000;

app.post('/saveJson', function(req, res) {
    console.log('receiving data ...');
    console.log("response status: "+res.statusCode);
    console.log('body is ',req.body);
    res.send(req.body);
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);


//helper functions to read and write JSON
function writeJSON(fname, obj) {
  const appDataDir = path.join(__dirname, `app_data`);
  fs.writeFileSync(path.resolve(appDataDir, fname), JSON.stringify(obj));
}

function readJSON(fname) {
  const appDataDir = path.join(__dirname, `app_data`);
  obj = JSON.parse(fs.readFileSync(path.resolve(appDataDir, fname), 'utf8'));
  return obj;
}