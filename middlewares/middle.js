const {body}=require("express-validator")

/*Verificación de campos vacíos*/
const verificarDatos = [
    body("titulo").notEmpty().withMessage("Debes completar el nombre"),
    body("description").notEmpty().withMessage("Debes completar el nombre")
    .isLength({max:150}).withMessage("Debe tener 150 caracteres como máximo"),
    body("precio").notEmpty().withMessage("Completar el campo")
    .isEmail().withMessage("Ingrese un e-mail válido")
]

/*evaluación de esos errores*/

/*const resultadoValidacion = (req, res, next) => {
    const errors = validationResult(req);
    next()
    
    if (errors.isEmpty()) {
        console.log("tiene todo");
        next();
    } else {
        console.log("no tiene todo");
        res.render('crearproducto')
    }
}
*/
module.exports={verificarDatos};