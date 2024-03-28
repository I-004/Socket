const producto = require("../modelos/producto");
const Producto = require("../modelos/producto");
function socket(io) {
    io.on("connection", (socket) => {
        mostrarProductos();
        //MOSTRAR PRODUCTOS
        async function mostrarProductos() {
            try {
                var productos=await Producto.find();
                io.emit("servidorEnviarProductos", productos);
            } catch (err) {
                console.log("Error al obtener los productos");
            }
        }

        //GUARDAR PRODUCTOS
        socket.on("clienteGuardarProducto",async(producto)=>{
            try{
                if (producto.id=="") {
                    await new Producto(producto).save();
                    io.emit("servidorProductoGuardado", "Producto guardado correctamente");
                } 
                else{
                    await Producto.findByIdAndUpdate(producto.id, producto);
                    io.emit("servidorProductoGuardado", "Producto actualizado");
                }
                mostrarProductos();
            } 
            catch (err) {
                console.log("Error al registrar el producto", err.message);
            }
        });

        //OBTENER PRODUCTO POR ID
        socket.on("clienteObtenerProductoId",async(id)=>{
            io.emit("servidorObtenerProductoId", await producto.findById(id));
        });

        //BORRAR PRODUCTO POR ID
        socket.on("clienteBorrarProducto", async (id) => {
            await Producto.deleteOne({ _id: id });
            mostrarProductos();
        });
    });
}

module.exports = socket;
