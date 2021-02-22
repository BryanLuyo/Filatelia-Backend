const { response } = require('express');
const Tema = require('../../models/catalogo/temas');

const getTemas = async(req, res) => {
    const temas = await Tema.find();
    res.json({
        ok: true,
        temas
    });
}

const createTema = async(req, res = response) => {

    const { name } = req.body;
    try {
        const existetema = await Tema.findOne({ name });
        if ( existetema ) {
            return res.status(400).json({
                ok: false,
                msg: 'El tema ya existe'
            });
        }
        const tema_ = new Tema( req.body );
        // Guardar usuario
        await tema_.save();
        res.json({
            ok: true,
            tema_
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deleteTema = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const tema_ = await Tema.findById( uid );
        if ( !tema_ ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un tema por ese id'
            });
        }

        const temaActualizado = await Tema.findByIdAndUpdate( uid, { estado : false }, { new: true } );

        //await Pais.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: "Tema eliminado",
            pais: temaActualizado
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const updateTema = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const tema_ = await Tema.findById( uid );

        if ( !tema_ ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Tema por ese id'
            });
        }
        // Actualizaciones
        const { name, ...campos } = req.body;

        if ( tema_.name !== name ) {

            const existeTema = await Tema.findOne({ name });
            if ( existeTema ) {
                return res.status(400).json({
                    ok: false,
                    msg: "ya existe un Tema con ese nombre"
                });
            }
        }

        const TemaActualizado = await Tema.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            anio: TemaActualizado
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
    getTemas,
    createTema,
    deleteTema,
    updateTema
}