const { Schema, model } = require('mongoose');

const TemasSchema = Schema({ 
    name : {
        type: String,
        require: true,
        unique: true
    },
    imagen : {
        type:String,
        default: ""
    },
    estado : {
        type:Boolean,
        default: true
    }
}, { collection: 'bdfc_temas' });

TemasSchema.method('toJSON', function() {
    const { __v, _id,  ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Tema', TemasSchema);