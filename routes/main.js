const express= require ("express");
const router = express.Router();

const mainController = require ("../controller/mainController");

router.get("/", mainController.home); 
router.get("/menu/:id", mainController.detalleMenu);
router.get("/search", mainController.search);
router.get("/product/crear", mainController.crear);
router.post("/product/crear", mainController.subir);
router.get("/editar/:id", mainController.edicion);
router.put("/editar/:id", mainController.editar);
router.delete("/editar/:id", mainController.eliminar);


module.exports=router;