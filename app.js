const express = require("express");
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + "/date.js");

let items = ['buy food','cook food','eat food'];
let workitems= [];

const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


//HOME
app.get('/',function(req,res){
  let day = date.getDate();
  res.render('lists',{workList:day,newListItem:items});
});
app.post('/',function(req,res){
  if(req.body.button ==="Work"){
    let item = req.body.newItem;
    workitems.push(item);
    res.redirect('/work');
  }else{
    let item = req.body.newItem;
    items.push(item);
    res.redirect('/');
  }
});

//WORK
app.get('/work',function(req,res){
  res.render('lists',{workList:"Work List",newListItem:workitems});
});
app.post('/work',function(req,res){
  var newWork = req.body.newItem;
  workitems.push(newWork);
  res.redirect('/work');
});

app.listen(3000,function(){
  console.log("Server Started!!!");
});
