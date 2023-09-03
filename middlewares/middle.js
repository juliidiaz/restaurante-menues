const {body,validationResult}=require("express-validator");
let menues = require("../dataBase/data.json");
const fs = require ("fs");
const path = require ("path");
const multer = require("multer");

/*ruta de la base de datos*/
const rutaData = path.join(__dirname, "..", "dataBase", "data.json")


/*Verificación de campos vacíos*/
const verificarDatos = [
    body("titulo").notEmpty().withMessage("Debes completar el nombre"),
    body("detalle").notEmpty().withMessage("Debes completar la descripción")
    .isLength({max:150}).withMessage("Debe tener 150 caracteres como máximo"),
    body("precio").notEmpty().withMessage("Completar el campo")
]


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

/*evaluación de esos errores*/
const resultadoValidacion = (req, res, next) => {
    const errors = validationResult(req);    
    if (errors.isEmpty()) {
        const nuevoMenu= {
            id: menues.length + 1,            
            img: req.file.filename,
            ...req.body,
        }

        /*se agrega al menu*/
        menues.push(nuevoMenu);
        /*de js a JSON*/
        fs.writeFileSync(rutaData, JSON.stringify(menues))

        next();
    } else {
        res.render('crearproducto', {
            errors: errors.mapped(),
            old: req.body          
        })
    }
}

 

module.exports={verificarDatos,  resultadoValidacion, upload};