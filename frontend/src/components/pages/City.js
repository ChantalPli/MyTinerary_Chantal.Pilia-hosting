import HeroImage from "../HeroImage";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from '../../api';
import Itinerary from "../Itinerary";
import { connect, } from 'react-redux';
import citiesAction from '../../redux/actions/citiesAction';
import '../styles/City.css';

function City(props) {
    const { id } = useParams();///toma el id que esta en la url
    // const [city, setCity] = useState(null);
    // const [isCityLoaded, setIsLoaded] = useState(false);
    // useEffect(() => {
    //     api.fetchCity(id).then(response => {
    //         if (response.data.success) {
    //             setCity(response.data.content.city);
    //         }
    //         setIsLoaded(true);
    //     });
    // });
    const {
        cityReady: ready, // Indica si la lista de ciudades cargó
        city, // Contiene la ciudad a renderizar
        fetchCity, // funcion que obtiene la ciudad a renderizar desde el backend
    } = props;
    // const dispatch = useDispatch();
    useEffect(() => {
        if (!ready || city._id !== id)
            fetchCity(id, true, true);
    }, [ready, fetchCity, id]);
    return (
        !ready || city._id !== id ? (<h1 className="message">Loading...</h1>) :
            city === null ? (<h1 className="message">City not found</h1>) :
                (<>
                    <HeroImage image={api.url + city.image}>
                        <h1>{city.name}</h1>
                        {/* <p>Under construction</p> */}
                    </HeroImage>
                    {
                        city.itineraries.length === 0 ? (<h1 className="message">We are sorry! We don't have any itineraries for this city at the moment!</h1>) :
                            city.itineraries.map(itinerary =>
                                <Itinerary key={itinerary._id} data={itinerary} />
                            )
                    }
                    {/* <UnderConstruction title={city.name} image={city.image}>
                        Under construction
                    </UnderConstruction> */}
                </>)
    );
}

export default connect(state => state.citiesReducer, citiesAction)(City);
//el primero seria un mapa del estado y el segundo un map de las acciones, o sea mapStateToProps y mapStateToAccion