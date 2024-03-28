const socket=io();

// Mostrar productos
socket.on("servidorEnviarProductos",(productos)=>{
    var tr="";
    productos.forEach((producto, idLocal)=>{
        tr=tr+`
            <tr>
                <td>${(idLocal+1)*100}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>
                    <a href="#" onclick="editarProducto('${producto._id}')">Editar</a> /
                    <a href="#" onclick="borrarProducto('${producto._id}')">Borrar</a>
                </td>
            </tr>
        `;
    });
    document.getElementById("datos").innerHTML=tr;
});
// Fin mostrar productos

// Guardar producto
var formNuevoProducto=document.getElementById("formNuevoProducto");
var datos=document.getElementById("datos");
var mensajes=document.getElementById("mensajes");
formNuevoProducto.addEventListener("submit",(e)=>{
    e.preventDefault();
    var producto={
        id:document.getElementById("id").value,
        nombre:document.getElementById("nombre").value,
        precio:document.getElementById("precio").value,
        stock:document.getElementById("stock").value
    }
    socket.emit("clienteGuardarProducto", producto);
    socket.on("servidorProductoGuardado",(mensaje)=>{
        console.log("Producto guardado");
        mensajes.innerHTML=mensaje;
        document.getElementById("nombre").value="";
        document.getElementById("precio").value="";
        document.getElementById("stock").value="";
        document.getElementById("nombre").focus();
        setTimeout(() => {mensajes.innerHTML=""}, 3000);
    });
});
// Fin guardar producto

// Editar producto parte 1
function editarProducto(id){
    console.log("Estás en editar producto "+id);
    socket.emit("clienteObtenerProductoId",id);
    socket.on("servidorObtenerProductoId",(producto)=>{
        document.getElementById("tituloFormulario").innerHTML="Editar producto";
        document.getElementById("textoBoton").innerHTML="Editar producto"
        document.getElementById("id").value = producto._id;
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("precio").value = producto.precio;
        document.getElementById("stock").value = producto.stock;
    });
}
// Fin editar producto parte 1

// Borrar producto
function borrarProducto(id){
    socket.emit("clienteBorrarProducto", id);
}
// Fin borrar producto
