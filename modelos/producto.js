const { mongoose } = require("../bd/conexion");
const productoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        default: 0
    },
    estatus:{
        type:Boolean,
        default:true
    }
});

module.exports = mongoose.model('producto', productoSchema);