const Joi = require("joi");

class Categoria{
    constructor(idCategoria, nombre){
        this.idCategoria=idCategoria;
        this.nombre=nombre
    }
}
module.exports=Categoria;

