const db = require("../dataBase/models");
const { Op, where } = require('sequelize');


const mainController = {
    home: (req, res) => {
        db.Menu.findAll()
        .then((menues)=>{
            return res.render("index",{menues})
        })
    },
    detalleMenu: (req, res) => {
        db.Menu.findByPk(req.params.id)
        .then((menu)=>{
            return res.render("detalleMenu", {detalleMenu:menu})            
        })
    },
    search: (req, res) => {
        const busquedadeUsuario = req.query.busqueda;
        const opcionesDeBusqueda = {
            where: {
              titulo: {
                [Op.like]: `%${busquedadeUsuario}%`
              },
            },
          };
          
          db.Menu.findAll(opcionesDeBusqueda)
            .then((resultados) => {
                return res.render("search", { resultados });
            })
    },
    crear: (req,res) => {
        res.render("crearproducto")
    },
    subir: (req, res) => {
        db.Menu.create({
            titulo:req.body.titulo,
            detalle:req.body.detalle,
            precio:req.body.precio,
            img:req.file.filename
        });
        res.redirect("/")
    },
    
    edicion: (req,res)=>{
        db.Menu.findByPk(req.params.id)
        .then((menu)=>{
            return res.render("modificarproducto",  {producto:menu})            
        })
    },
    editar: (req, res) => {
        const updateData = {
          titulo: req.body.titulo,
          detalle: req.body.detalle,
          precio: req.body.precio,
        };
        if (req.file) {
          updateData.img = req.file.filename;
        }      
        db.Menu.update(updateData, {
          where: {
            id: req.params.id,
          },
        }).then(() => {
          res.redirect("/search/?busqueda=");
        });
      },
    eliminar: (req,res)=>{
        db.Menu.destroy({
            where: {id:req.params.id}
        }).then(()=>{
            res.redirect ("/search/?busqueda=");
        })        
    }
}

module.exports=mainController;  
