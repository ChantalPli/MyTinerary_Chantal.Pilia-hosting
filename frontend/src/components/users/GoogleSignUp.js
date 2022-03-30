import React from 'react';
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux';
import userActions from '../../redux/actions/userActions';


function GoogleSignUp(props) {

    const responseGoogle = async (res) => {

        console.log(res)

        const userData = { //creamos un objeto con todos estos datos
            firstName: res.profileObj.givenName,
            lastName: res.profileObj.familyName,
            email: res.profileObj.email,
            password: res.profileObj.googleId,
            picture: res.profileObj.imageUrl,
            country: props.country,
            from: "google"
        }
        await props.signUpUser(userData) // le pasamos una funcion que viene de las actions 
    }

    return (
        <GoogleLogin
            className="buttonsocial"
            clientId="815029429047-l7figikk4re51p1ih9flv69kohsoplvr.apps.googleusercontent.com"
            buttonText="SignUp with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />

    );
}

const mapDispatchToProps = {
    signUpUser: userActions.signUpUser,

}

export default connect(null, mapDispatchToProps)(GoogleSignUp);




//815029429047-l7figikk4re51p1ih9flv69kohsoplvr.apps.googleusercontent.com