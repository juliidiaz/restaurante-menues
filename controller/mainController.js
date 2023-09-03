let menues=require("../dataBase/data.json");
const fs=require ("fs");
const path = require ("path");
const dataFile = path.join(__dirname, "..", "dataBase", "data.json");


const mainController = {
    home: (req, res) => {
        res.render("index", {menues});
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
        const resultados = menues.filter((e) => {
            return e.titulo.includes(busquedadeUsuario)
        })
       res.render("search", { resultados: resultados });
      },
    crear: (req,res) => {
        res.render("crearproducto")
    },
    subir: (req, res) => {
        res.redirect("/search/?busqueda=")     
    },
    
    edicion: (req,res)=>{
        const productoId=menues.find((element)=>{
            return element.id == req.params.id
        });
        res.render("modificarproducto", {producto:productoId})
    },

    editar: (req,res)=>{
        const { titulo, detalle, precio, img } = req.body;
        const {id} = req.params;
        const productoId=menues.find((e)=>{
            return e.id == id
        });
        console.log(productoId);
        
        titulo ? productoId.titulo = titulo: productoId.titulo;
        detalle ? productoId.detalle = detalle: productoId.detalle;
        precio ? productoId.precio = precio: productoId.precio;
        if (req.file) {
            productoId.img = req.file.filename; // Usar el nombre generado por multer
        }
        console.log(req.file);

        fs.writeFileSync(dataFile, JSON.stringify(menues));  

        res.redirect("/search/?busqueda=")
    },
    eliminar: (req,res)=>{
        const {id} = req.params;
        nuevoMenu = menues.filter((element)=>{
            return element.id != id
        })
        menues=nuevoMenu;
        fs.writeFileSync(dataFile, JSON.stringify(menues));

        res.redirect ("/search/?busqueda=");
        
    }
}

module.exports=mainController;  
