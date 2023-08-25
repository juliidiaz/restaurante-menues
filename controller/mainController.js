const dataBase=require("../dataBase/data.json");
let {menues}=dataBase;
const fs=require ("fs");
const path = require ("path");
const dataFile = path.join(__dirname, "..", "dataBase", "data.json");
const { log } = require("console");

const mainController = {
    home: (req, res) => {
        res.render("index", {menues:menues});
    },
    detalleMenu: (req, res) => {
        const {id} = req.params;
        const menu = menues.find ((valorAbuscar) => {
            return id==valorAbuscar.id         
        })
        res.render("detalleMenu", {detalleMenu:menu});
    },
    search: (req, res) => {
        const busquedadeUsuario = req.query.busqueda;
        const resultados = menues.filter((valorEnI) => {
            return valorEnI.titulo.includes(busquedadeUsuario)
        })
       res.render("search", { resultados: resultados });
      },
    crear: (req,res) => {
        res.render("crearproducto")
    },
    subir: (req, res) => {
        const { id, title, description, price, image } = req.body;
        const menuNuevo= {
            id,
            titulo:title,
            detalle: description,
            precio: price,
            img: image
        }     
        menues.push(menuNuevo);
        fs.writeFileSync(dataFile, JSON.stringify(dataBase));  
        res.redirect("/")            
    },
    
    edicion: (req,res)=>{
        const productoId=menues.find((element)=>{
            return element.id == req.params.id
        });
        res.render("modificarproducto", {producto:productoId})
    },

    editar: (req,res)=>{
        console.log("esta es la ruta de edición");
        const { title, description, price, image } = req.body;
        const {id} = req.params;
        const productoId=menues.find((element)=>{
            return element.id == id
        });
        
        title ? productoId.titulo = title: productoId.titulo;
        description ? productoId.detalle = description: productoId.detalle;
        price ? productoId.precio = price: productoId.precio;
        image ? productoId.img = image: productoId.img;

        fs.writeFileSync(dataFile, JSON.stringify(dataBase));  

        res.redirect("/")
    },
    eliminar: (req,res)=>{
        const {id} = req.params;
        const productoId=menues.find((element)=>{
            return element.id == id
        });
        menues = menues.filter((element)=>{
            return element.id != id
        })
        dataBase.menues=menues;
        fs.writeFileSync(dataFile, JSON.stringify(dataBase));

        res.redirect ("/");
        
    }
}

module.exports=mainController;  
