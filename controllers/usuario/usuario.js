const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../../models/usuario/usuario');

const getUsuario = async(req, res) => {
    const usuarios = await Usuario.find({ estado : true },
          'name email imagenP telefono dir_linea1 dir_linea2 ciudad provincia pais codigopostal estado');
    res.json({
        ok: true,
        usuarios
    });
}

const createUsuario = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const existeusuario = await Usuario.findOne({ email });
        if ( existeusuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }
        const usuario_ = new Usuario( req.body );
        
        const salt = bcrypt.genSaltSync();
        usuario_.password = bcrypt.hashSync( password, salt );
        // Guardar usuario
        await usuario_.save();
        
        res.json({
            ok: true,
            usuario_
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deleteUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const usuario_ = await Usuario.findById( uid );
        if ( !usuario_ ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }


        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, { estado : false }, { new: true } );

        //await Pais.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: "usuario eliminado",
            pais: usuarioActualizado
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const updateUusuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuario_ = await Usuario.findById( uid );

        if ( !usuario_ ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        // Actualizaciones
        const { email, password, estado, ...campos } = req.body;

        if ( usuario_.email !== email ) {

            const existeusuario = await Usuario.findOne({ email });
            if ( existeusuario ) {
                return res.status(400).json({
                    ok: false,
                    msg: "ya existe un usuario con ese nombre"
                });
            }
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            pais : usuarioActualizado
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
    getUsuario,
    createUsuario,
    deleteUsuario,
    updateUusuario
}
