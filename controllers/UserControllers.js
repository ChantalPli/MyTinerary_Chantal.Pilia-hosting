const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')        //NPM CRYPTO
const nodemailer = require('nodemailer') //NPM NODEMAILER
const jwt = require('jsonwebtoken');

// C!h#A$n%T&a/L(p)I=l?I*a


const sendEmail = async (email, uniqueString) => { //FUNCION ENCARGADA DE ENVIAR EL EMAIL

    const transporter = nodemailer.createTransport({ //DEFINIMOS EL TRASPORTE UTILIZANDO NODEMAILER
        host: 'smtp.gmail.com',         //DEFINIMOS LO PARAMETROS NECESARIOS
        port: 465,
        secure: true,
        auth: {
            user: "chantal.bootcamp@gmail.com",    //DEFINIMOS LOS DATOS DE AUTORIZACION DE NUESTRO PROVEEDOR DE
            pass: "123abchantal"                          //COREO ELECTRONICO, CONFIGURAR CUAENTAS PARA PERMIR EL USO DE APPS
        }                                               //CONFIGURACIONES DE GMAIL
    })

    // EN ESTA SECCION LOS PARAMETROS DEL MAIL 
    let sender = "useremailverifyMindHub@gmail.com"
    let mailOptions = {
        from: sender,    //DE QUIEN
        to: email,       //A QUIEN
        subject: "Verificacion de email usuario ", //EL ASUNTO Y EN HTML EL TEMPLATE PARA EL CUERPO DE EMAIL Y EL LINK DE VERIFICACION
        html: `
        <div >
        <h1 style="color:red">To verify your email please press <a href=http://localhost:4000/api/verify/${uniqueString}>here</a> para confirma tu email. Thank you! </h1>
        </div>
        `

    };
    await transporter.sendMail(mailOptions, function (error, response) { //SE REALIZA EL ENVIO
        if (error) { console.log(error) }
        else {
            console.log("Message sent")

        }
    })
};




const usersControllers = {

    verifyEmail: async (req, res) => {

        const { uniqueString } = req.params; //EXTRAE EL EL STRING UNICO DEL LINK

        const user = await User.findOne({ uniqueString: uniqueString })
        //console.log(user) //BUSCA AL USUARIO CORRESPONDIENTE AL LINK
        if (user) {
            user.emailVerified = true //COLOCA EL CAMPO emailVerified en true
            await user.save()
            res.redirect("http://localhost:3000/") //REDIRECCIONA AL USUARIO A UNA RUTA DEFINIDA
            //return  res.json({success:true, response:"Su email se ha verificado correctamente"})
        }
        else { res.json({ success: false, response: "We couldn't verify your email" }) }
    },


    signUpUsers: async (req, res) => {
        let { firstName, lastName, email, password, picture, country, from } = req.body.userData  //hago destruc. de userData
        const test = req.body.test //chiedere!

        try {

            const usuarioExiste = await User.findOne({ email }) //cerca se l'usuario esiste nella base de datos/due condizioni se l'usuario esiste

            if (usuarioExiste) {
                // console.log(usuarioExiste.from.indexOf(from))

                if (usuarioExiste.from.indexOf(from) !== -1) { //INDEXOF = 0 EL VALOR EXISTE EN EL INDICE EQ A TRUE -1 NO EXITE EQ A FALSE
                    //console.log("resultado de if " + (usuarioExiste.from.indexOf(from) !== 0))
                    res.json({
                        success: false,
                        from: "signup",
                        message: "Looks like you are already signed up. Please, sign in"
                    })
                } else {
                    const contraseñaHasheada = bcryptjs.hashSync(password, 10)
                    usuarioExiste.from.push(from)
                    usuarioExiste.password.push(contraseñaHasheada)

                    if (from === "signup") {

                        usuarioExiste.uniqueString = crypto.randomBytes(15).toString('hex')
                        await usuarioExiste.save()
                        await sendEmail(email, usuarioExiste.uniqueString) //LLAMA A LA FUNCION ENCARGADA DEL ENVIO DEL CORREO ELECTRONICO
                        res.json({
                            success: true,
                            from: "signup",
                            message: "A confirmation email has been sent to you. Please confirm it to proceed with Sign In."
                        })
                    } else {
                        usuarioExiste.save() // si el id viene de otro form ...

                        res.json({
                            success: true,
                            from: "signup", //viene de otro from non da signup!!!!
                            message: "You can now sign in with " + from
                        })
                    }// EN ESTE PUNTO SI EXITE RESPONDE FALSE
                }
            } else {
                //SI EL USUARIO NO ESXITE
                const contraseñaHasheada = bcryptjs.hashSync(password, 10) //encriptamos la password
                // CREA UN NUEVO OBJETO DE PERSONAS CON SU USUARIO Y CONTRASEÑA (YA ENCRIPTADA)
                const nuevoUsuario = await new User({ //creamos un modelo para el nuevo usuario que tendra los datos que el modelo requiere
                    firstName,
                    lastName,
                    email,
                    picture,
                    password: [contraseñaHasheada],
                    uniqueString: crypto.randomBytes(15).toString('hex'),
                    country,
                    emailVerified: false,
                    from: [from],

                })
                //SE LO ASIGNA AL USUARIO NUEVO
                if (from !== "signup") { //SI LA PETICION PROVIENE DE CUENTA GOOGLE y no del formulario
                    await nuevoUsuario.save() //guardamos el valor en la base de datos y damos una respuesta (message)
                    res.json({
                        success: true,
                        from: "signup",
                        message: "Your account with " + from + " has been successfully created!"
                    }) // AGREGAMOS MENSAJE DE VERIFICACION
                } else {
                    //PASAR EMAIL VERIFICADO A FALSE
                    //ENVIARLE EL E MAIL PARA VERIFICAR
                    await nuevoUsuario.save()
                    await sendEmail(email, nuevoUsuario.uniqueString) //LLAMA A LA FUNCION ENCARGADA DEL ENVIO DEL CORREO ELECTRONICO
                    res.json({
                        success: true,
                        from: "signup",
                        message: "We sent you an email to verify your account. Please check your inbox!"
                    }) // AGREGAMOS MENSAJE DE VERIFICACION
                }
            }
        } catch (error) {
            console.log(error)
            res.json({ success: false, message: "Oh Snap! An error has occured, please try again." }) //CAPTURA EL ERROR
        }
    },
    signInUser: async (req, res) => {

        const { email, password, from } = req.body.loggedUser
        //console.log(req.body)
        try { //busca si el usuario existe, lo busca por email
            const usuarioExiste = await User.findOne({ email }) // busca email en base de dque coincida con el email que se acaba de enviar 
            // const indexpass = usuarioExiste.from.indexOf(from)
            if (!usuarioExiste) {// si el usuario NO existe -PRIMERO VERIFICA QUE EL USUARIO EXISTA
                res.json({ success: false, message: "We couldn't find an account with that email address. Please, sign up. " })

            } else {
                if (from !== "signin") { // si existe y viene de google o fb se pide verificacion adicional

                    let contraseñaCoincide = usuarioExiste.password.filter(pass => bcryptjs.compareSync(password, pass))

                    if (contraseñaCoincide.length > 0) { //TERCERO VERIFICA CONTRASEÑA / verificamos la coincidencia con la password

                        const userData = {
                            id: usuarioExiste._id,
                            firstName: usuarioExiste.firstName,
                            lastName: usuarioExiste.lastName,
                            picture: usuarioExiste.picture,
                            email: usuarioExiste.email,
                            from: usuarioExiste.from
                        }
                        await usuarioExiste.save() // si se registro por fb o google realiza un metodo para guardar en nuestro array una password encriptada; se toma en cuenta el id del usuario, con este creamos una password ficticia 

                        const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })
                        res.json({
                            success: true,
                            from: from,
                            response: { token, userData },
                            message: "Welcome back " + userData.firstName,
                        })

                    } else {
                        res.json({
                            success: false,
                            from: from,
                            message: "It looks like you never signed up with  " + from + "before. You need to comsi quieres ingresar con este metodo debes hacer el signUp con " + from
                        })
                    }
                } else { //viene del signin 
                    if (usuarioExiste.emailVerified) { //y el email esta verificado
                        let contraseñaCoincide = usuarioExiste.password.filter(pass => bcryptjs.compareSync(password, pass))
                        if (contraseñaCoincide.length > 0) { //el usuario vino por un medio diferente al formulario y la password existe o sea el usuario ya esta registrado con este medio 

                            const userData = {
                                id: usuarioExiste._id,
                                firstName: usuarioExiste.firstName,
                                lastName: usuarioExiste.lastName,
                                email: usuarioExiste.email,
                                picture: usuarioExiste.picture,
                                from: usuarioExiste.from
                            }
                            const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })
                            res.json({
                                success: true,
                                from: from,
                                response: { token, userData },
                                message: "Welcome back " + userData.firstName,
                            })
                        } else { // si la password no coincide
                            res.json({ //si es diferente al signin y la password no esta guardada entonces el usuario no esta logueado con este medio y le damos una respuesta de tipo false
                                success: false,
                                from: from,
                                message: "Something went wrong...username and password don't match",
                            })
                        }
                    } else { // si el correo no esta verificado se invita al user que lo verifique 
                        res.json({
                            success: false,
                            from: from,
                            message: "To complete the signup you need to confirm your email address by clicking on the link in the confirmation email we sent to you.  "
                        })
                    }

                } //SI NO ESTA VERIFICADO
            }

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Oh snap! Something went wrong...try again in a few seconds." })
        }
    },


    signOutUser: async (req, res) => {
        const email = req.body.closeuser // se obtiene la email 
        const usuarioExiste = await User.findOne({ email });
        const userData = usuarioExiste ? {
            id: usuarioExiste._id,
            firstName: usuarioExiste.firstName,
            lastName: usuarioExiste.lastName,
            email: usuarioExiste.email,
            picture: usuarioExiste.picture,
            from: usuarioExiste.from
        } : null;
        res.json({
            success: usuarioExiste ? true : false,
            message: usuarioExiste ? 'Session closed ' + email : 'Not a registered user.',//fatto prima di nascondere il tasto del signout 
            response: { userData }
        })
    },
    //////per mantenere la sessione 
    verificarToken: (req, res) => {
        //console.log(req.user)
        if (!req.err) {
            res.json({
                success: true,
                response: { id: req.user.id, firstName: req.user.firstName, lastName: req.user.lastName, picture: req.user.picture, email: req.user.email, from: "token" },
                message: "Welcome back " + req.user.firstName
            })
        } else {
            res.json({
                success: false,
                message: "Please, sign in again"
            })
        }
    }


}
module.exports = usersControllers