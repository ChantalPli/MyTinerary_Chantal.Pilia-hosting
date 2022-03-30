import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import userActions from "../../redux/actions/userActions";
import HeroImage from '../HeroImage';
import api from '../../api';
import FacebookSignIn from '../facebookSignIn';
import GoogleSignIn from './GoogleSignIn';
import '../styles/StyleSign.css'

const theme = createTheme();

function SignIn(props) {

    const handleSubmit = (event) => { // cargo los datos 
        event.preventDefault();
        const loggedUser = {  // creamos objetos con estos datos 
            email: event.target.email.value,
            password: event.target.password.value,
            from: "signin"
        }
        props.signInUser(loggedUser); //los pasamos a una funcion que viene de las actions 
    };
    if (props.user) //se l'usuario è connesso allora vai a home invece di farmi restare nella pagina del form
        window.location.href = '/';
    return props.user ? (<h1 className='message'>Redirecting...</h1>) : (

        <ThemeProvider theme={theme}>

            <HeroImage image={api.url + "/images/water.jpg"}>
                <h1>SIGN IN </h1>
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
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <FacebookSignIn />
                    <GoogleSignIn />
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        //TODO: Remove this line!!!!!!!!!!!remembeeeer
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                                <Link to="#">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid className="link_b" item style={{ margin: 'auto' }}>
                                <Link style={{ color: 'black' }} to="/signup">
                                    {"Don't have an account? Sign Up"}
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
        message: state.userReducer.message,
        user: state.userReducer.user
    }
}
export default connect(mapStateToProps, userActions)(SignIn);