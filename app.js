const express =require("express");
const app=express();
const path = require("path");
const mainRoute= require("./routes/main");
const methodOverride =  require('method-override');

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine", "ejs");


app.listen(3032, ()=> console.log("puerto andando 3032"));

app.use("/", mainRoute);


