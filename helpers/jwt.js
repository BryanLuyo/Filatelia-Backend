const jwt = require('jsonwebtoken');

const generarJWT = ( uid, role ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = {
            uid,
            role
        };
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, ( err, token ) => {
    
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el Token');
            } else {
                resolve( token );
            }
    
        });

    });

}


module.exports = {
    generarJWT
}