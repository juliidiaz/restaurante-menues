const express= require ("express");
const router = express.Router();
const path = require ("path")

/*Controladores*/
const mainController = require ("../controller/mainController");

/*middle*/
const { verificarDatos,  resultadoValidacion, upload } = require ("../middlewares/middle")


/*renderizar vistas*/
router.get("/", mainController.home); 

/*busqueda de menu*/
router.get("/search", mainController.search);
router.get("/menu/:id", mainController.detalleMenu);

/*crear-editar-borrar menues*/
router.get("/product/crear", mainController.crear);
router.post("/product/crear", upload.single("img"), verificarDatos, resultadoValidacion, mainController.subir);
router.get("/editar/:id", mainController.edicion);
router.put("/editar/:id", upload.single("img"), mainController.editar);
router.delete("/editar/:id", mainController.eliminar);


module.exports=router;