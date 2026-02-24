class Imagen {
    constructor(idImagen, productoId, url, esPrincipal, estado){
       this.idImagen=idImagen;
       this.productoId=productoId;
       this.url=url;
       this.esPrincipal=esPrincipal;
       this.estado=estado;
    }
}

module.exports = Imagen;