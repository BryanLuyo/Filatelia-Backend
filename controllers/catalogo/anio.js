const { response } = require('express');
const Anio = require('../../models/catalogo/anio');


const getAnio = async(req, res) => {
    const anios = await Anio.find();
    res.json({
        ok: true,
        anios
    });
}

const createAnio = async(req, res = response) => {

    const { year_ } = req.body;
    try {
        const existeanio = await Anio.findOne({ year_ });
        if ( existeanio ) {
            return res.status(400).json({
                ok: false,
                msg: 'El año ya existe'
            });
        }
        const anio = new Anio( req.body );
        // Guardar usuario
        await anio.save();
        res.json({
            ok: true,
            anio
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deleteAnio = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const anioDB = await Anio.findById( uid );
        if ( !anioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un año por ese id'
            });
        }

        await Anio.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Año eliminado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const updateAnio = async (req, res = response) => {

    const uid = req.params.id;
        
    try {

        const anioDB = await Anio.findById( uid );

        if ( !anioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un año por ese id'
            });
        }
        // Actualizaciones
        const { year_, ...campos } = req.body;

        if ( anioDB.year_ !== year_ ) {

            const existeAnio = await Anio.findOne({ year_ });
            if ( existeAnio ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe ese Año'
                });
            }
        }
 
        const anioActualizado = await Anio.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            anio: anioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

module.exports = {
    getAnio,
    createAnio,
    deleteAnio,
    updateAnio
}