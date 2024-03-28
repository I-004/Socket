const usuario = require("../modelos/usuario");
const Usuario =  require ("../modelos/usuario");
function socket(io){
    io.on("connection",(socket)=>{
        mostrarUsuarios();
        //MOSTRAR USUARIOS
        async function mostrarUsuarios(){
            try{
                var usuarios=await Usuario.find();
                //console.log(usuarios);
                io.emit("servidorEnviarUsuarios",usuarios);
            }
            catch(err){
                console.log("Error al obtener los usuarios");
            }
        }
        //GUARDAR USUARIOS
        socket.on("clienteGuardarUsuario",async(usuario)=>{
                try{
                    if(usuario.id==""){
                        await new Usuario(usuario).save();
                        io.emit("servidorUsuarioGuardado","Usuario guardado correctamente");    
                    }
                    else{
                        await Usuario.findByIdAndUpdate(usuario.id, usuario)
                        io.emit("servidorUsuarioGuardado","Usuario actualizado");
                    }
                    mostrarUsuarios();
                }
                catch(err){
                    console.log("Error al registrar al usuario");
                }
        });

        //OBTENER USUARIO POR ID
        socket.on("clienteObtenerUsuarioId",async(id)=>{
            io.emit("servidorObtenerUsuarioId",await usuario.findById(id));
        });
        //BORRA USUARIO POR ID
        socket.on("clienteBorrarUsuario",async(id)=>{
            await Usuario.deleteOne({_id:id});
            mostrarUsuarios();
        });
    });
}
module.exports=socket;