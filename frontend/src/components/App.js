import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomAppBar from './CustomAppBar'
import Home from './pages/Home';
import Cities from './pages/Cities';
import Footer from './Footer';
import City from './pages/City';
import SignUp from "./users/SignUp";
import SignIn from "./users/SignIn";
import Snackbar from "./Snackbar";
import userActions from '../redux/actions/userActions';
import { connect } from "react-redux";



import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './styles/App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
    },
  },
});

function App(props) {
  useEffect(() => {

    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem("token")
      if (token)
        props.VerificarToken(token)
    }
  }, [])
  return (

    <Router>

      <ThemeProvider theme={theme}>
        <CustomAppBar />
      </ThemeProvider>
      <Routes>
        {/* {!props.user && <Route exact path="/signin" element={<SignIn />} />}
        {!props.user && <Route exact path="/signup" element={<SignUp />} />} */}
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        {/* <Route exact path="/signup" element={<SignUp />} /> */}
        <Route exact path="/cities/:id" element={<City />} />
        <Route exact path="/cities" element={<Cities />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
      <Snackbar />
    </Router>
  );
}
const mapDispatchToProps = {
  VerificarToken: userActions.VerificarToken,

}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }


}





export default connect(mapStateToProps, mapDispatchToProps)(App);
