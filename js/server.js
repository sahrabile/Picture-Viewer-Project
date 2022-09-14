//all libraries we need 
var express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
const fs = require('fs');

//create perfect environment for app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({
  origin: '*'
}));

var port = 3000;

//endpoint 
app.post('/saveJson', function(req, res) {
    console.log('receiving data ...');
    console.log("response status: "+res.statusCode);
    console.log('body is ',req.body);
    res.send(req.body);
    //now update json file!
    const reqBody = JSON.stringify(req.body);
    const data = `{"albums":${reqBody}}`;
    writeToFile(data);
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);


//helper functions to write JSON
function writeToFile(data){
  fs.writeFile("app-data\\library\\picture-library2.json", data, (err) => {
    if(err){
      throw err;
    }
    console.log("Data saved");
  })
}