const { Schema, model } = require('mongoose');

const CatalogoSchema = Schema({
     
    titulo : {
        type : String,
        required:true,
    },
    denominacion: {
        type : String,
        required:true
    },
    impresion : {
        type : String,
        required: true
    },
    format : {
        type : String,
        required: true
    },
      
});