//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost:27017/listDB", {useNewUrlParser : true});
app.set('view engine', 'ejs');


const listSchema = {
  name: String
};


const Item = mongoose.model("Item", listSchema);
const item1  = new Item({
    name: "WELCOME TO YOUR TODOLIST"
});
const item2  = new Item({
    name: "HIT THE + BUTTON TO ADD NEW ITEM"
});
const item3  = new Item({
    name: "<-- HIT  THIS TO DELETE"
});

const defaultItems = [item1, item2, item3];
Item.insertMany(defaultItems)
      .then(function () {
        console.log("Successfully saved defult items to DB");
      })
      .catch(function (err) {
        console.log(err);
      });
  

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res) {
const day = date.getDate();
Item.find({})
.then(function (err,items) {
  res.render("list", {listTitle: day, newListItems: items});
    });  
});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
