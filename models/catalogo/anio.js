const { Schema, model} = require('mongoose');

const AnioSchema = Schema({
    year_: {
        type: String,
        required: true,
        unique: true
    },
    estado : {
        type : Boolean,
        default : true
    }
},{  collection: 'bdfc_anio' });

AnioSchema.method('toJSON', function() {
    const { __v, _id,  ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model( 'Anio', AnioSchema );