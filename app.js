const express =require("express");
const app=express();
const path = require("path");
const methodOverride =  require('method-override');

/*middle globales*/
app.use(express.static(path.resolve(__dirname, "public")));
app.use(methodOverride('_method'));

//Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*vistas*/
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

/*puerto*/
app.listen(3032, ()=> console.log("puerto andando 3032"));

/*rutas*/
const mainRoute= require("./routes/main");
app.use("/", mainRoute);


