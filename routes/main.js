const express= require ("express");
const router = express.Router();
const multer = require("multer");
const path = require ("path")

/*Controladores*/
const mainController = require ("../controller/mainController");

/*middle*/
const { verificarDatos, resultadoValidacion } = require ("../middlewares/middle")

//subir img
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        const rutaImg= path.join(__dirname, "..", "public", "images");
        cb (null, rutaImg)
    },
    filename: function (req, file, cb) {
        const filename="menu-"+Date.now()+path.extname(file.originalname);
        cb(null, filename)
    }
})

const upload =multer({storage})

/*renderizar vistas*/
router.get("/", mainController.home); 

/*busqueda de menu*/
router.get("/search", mainController.search);
router.get("/menu/:id", mainController.detalleMenu);

/*crear-editar-borrar menues*/
router.get("/product/crear", mainController.crear);
router.post("/product/crear", upload.single("img"), verificarDatos, mainController.subir);
router.get("/editar/:id", mainController.edicion);
router.put("/editar/:id", mainController.editar);
router.delete("/editar/:id", mainController.eliminar);


module.exports=router;