const { Schema, model } = require('mongoose');
const PaisSchema = Schema({
     name: {
        type : String,
        required: true,
        unique: true
     },
     moneda : {
        type : String,
        required : true
     },
     abreviatura : {
        type : String,
        required : true
     },
     img : {
      type : String,
      required : true
     },
     estado : {
         type : Boolean,
         default : true
     }
},{  collection: 'bdfc_pais' })


PaisSchema.method('toJSON', function() {
    const { __v, _id,  ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Pais', PaisSchema);