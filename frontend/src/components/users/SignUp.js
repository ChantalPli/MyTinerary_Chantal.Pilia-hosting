import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import userActions from "../../redux/actions/userActions";
import Countries from '../Countries'
import HeroImage from '../HeroImage';
import api from '../../api';
import FacebookSignUp from '../facebookSignUp';
import GoogleSignUp from './GoogleSignUp';
import '../styles/StyleSign.css'



const theme = createTheme();

function SignUp(props) {
    const handleSubmit = (event) => {

        event.preventDefault();
        try {
            console.log(event.target);
            const userData = {
                // firstName: event.target.firstName.value,
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                email: event.target.email.value,
                password: event.target.password.value,
                picture: event.target.picture.value,
                country: event.target.country.value,
                from: "signup" // envia al back es userdata
            };

            props.signUpUser(userData);
        } catch (error) {
            console.log(error)
        }
    };

    const [hideForm, setHideForm] = React.useState(true);

    if (props.user) //se l'usuario è connesso allora vai a home invece di farmi restare nella pagina del form
        window.location.href = '/';
    return props.user ? (<h1 className='message'>Redirecting...</h1>) : (
        <ThemeProvider theme={theme}>
            <HeroImage image={api.url + "/images/sardegna5.jpg"} >
                <h1>SIGN UP</h1>
            </HeroImage>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 14,
                        marginBottom: 14,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ m: 3, display: 'flex', alignItems: 'center', flexDirection: 'column' }} component="form" noValidate onSubmit={handleSubmit}>
                        <Countries onChange={event => setHideForm(event.target.value.trim() === '')} />
                        <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <FacebookSignUp />
                        <GoogleSignUp />
                        {hideForm ? null : (  //si el formulario esta oculto allora non visualizzare niente altrimenti mi visualizzi quello c'e sotto 
                            <>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={6}>

                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                        // autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>


                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="picture"
                                            label="URL profile picture"
                                            name="picture"
                                            autoComplete="URL picture"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/* <Countries /> */}
                                    </Grid>

                                    {/* 
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid> */}
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                        <Grid container justifyContent="flex-end">
                            <Grid item style={{ margin: 'auto' }}>
                                <Link style={{ color: 'black', textAlign: 'center', display: 'flex' }} to="/signIn" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>

    );
}
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}
export default connect(mapStateToProps, userActions)(SignUp)