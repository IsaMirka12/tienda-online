class Producto {
    constructor(id, nombre, descripcion, precio, stock, categoria_id, estado ){
       this.id = id;
       this.nombre = nombre;
       this.descripcion=descripcion;
       this.precio=precio;
       this.stock=stock;
       this.categoria_id=categoria_id;
       this.estado=estado;
    }
}

module.exports = Producto;