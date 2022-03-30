//3014369005495486


import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import './styles/StyleSign.css'

function FacebookSignUp(props) {

    const responseFacebook = async (res) => {
        console.log(res)
        console.log(res.name)
        const fullNameSeparado = res.name.split(" ")
        console.log(fullNameSeparado)

        let nombre = fullNameSeparado[0]
        let apellido = fullNameSeparado[1]
        console.log(nombre)
        console.log(apellido)

        const userData = {
            firstName: fullNameSeparado[0],
            lastName: fullNameSeparado[1],
            //   fullName: res.name,
            email: res.email,
            password: res.id,
            from: "facebook",
            // country: props.pais
        }
        await props.signUpUser(userData)
    }

    return (
        <FacebookLogin
            cssClass="buttonsocial my-facebook-button-class"
            icon="fa-facebook"
            textButton=" SignUp with Facebook"
            appId="3014369005495486"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}

        />
    );
}
const mapDispatchToProps = {
    signUpUser: userActions.signUpUser,

}

export default connect(null, mapDispatchToProps)(FacebookSignUp);