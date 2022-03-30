import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HeroImage from '../HeroImage';
import '../styles/Cities.css';
import api from '../../api.js';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import React, { useEffect } from 'react';
import { Link as LinkRouter } from "react-router-dom"

import { connect } from 'react-redux';
import citiesAction from '../../redux/actions/citiesAction';

const myFilterOptions = createFilterOptions({
    matchFrom: 'start',
    trim: true,
});

function Cities(props) {

    const {
        allCitiesReady: ready, // Indica si la lista de ciudades cargó
        allCities, // Contiene la lista de todas las ciudades
        filteredCities, // Contiene la lista de ciudades a mostrar
        fetchCities, // funcion que obtiene la lista de ciudades del backend
        filterCities // funcion que actualiza el filtro
    } = props;

    // allCities === props.allCities
    // ready === props.allCitiesReady

    useEffect(() => {
        if (!ready)
            fetchCities();
    }, [ready, fetchCities]);
    // const [search, setSearch] = useState('');////buscador valor inicial string vcio
    // const [isCitiesLoaded, setIsLoaded] = useState(false); ///determina si lista ciudades esta cargada 
    // const [allCities, setAllCities] = useState([]); //lista citta 
    // useEffect(() => {
    //     api.fetchCities().then(response => {
    //         if (response.data.success) {
    //             setAllCities(response.data.content.cities);// allCities = response.data.content.cities
    //         }
    //         setIsLoaded(true);// isLoaded = true
    //     });
    //     // const response = await api.fetchCities();
    //     // if (response.data.success) {
    //     // setAllCities();
    //     // setIsLoaded(true);
    //     // }
    // });
    // const filteredCities = search === '' ? allCities : allCities.filter(city => city.name.toLowerCase().startsWith(search));
    return (
        <>
            <HeroImage image={api.url + "/images/sardegna_hero.jpg"}>
                <h1>LET THE ADVENTURE BEGIN</h1>
            </HeroImage>
            <Autocomplete
                freeSolo
                disableClearable
                filterOptions={myFilterOptions}
                sx={{ margin: '16px auto', width: 300 }}
                options={allCities.map(city => city.name).sort()}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Search cities"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                        onChange={event => {
                            filterCities(event.target.value.trim().toLowerCase());
                        }}
                    />
                )}
            />
            <section className="cards-of-cities">
                {
                    !ready ? (<h1 className="message">Loading...</h1>) :
                        filteredCities.length === 0 ? (<h1 className="message">Sorry, we couldn't find any city</h1>) :
                            filteredCities.map((city, index) =>
                                <Card className="cards_h lampara" key={index} sx={{ maxWidth: 600, }}>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={api.url + city.image}
                                        alt={city.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {city.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {city.description}
                                        </Typography>
                                    </CardContent>
                                    <LinkRouter style={{ textDecoration: 'none' }} to={"/cities/" + city._id}>
                                        <CardActions>
                                            <Button size="small">More Details</Button>
                                        </CardActions>
                                    </LinkRouter>
                                </Card>
                            )}
            </section>
        </>
    )
}

export default connect(state => state.citiesReducer, citiesAction)(Cities);
