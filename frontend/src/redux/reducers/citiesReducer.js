const initialState = {
    // Cities
    filter: '',
    allCitiesReady: false,
    allCities: [],
    filteredCities: [],
    // City
    cityReady: false,
    city: null,
};

const citiesReducer = (state = initialState, action) => {
    const citiesByNameStartsWith = (city) => city.name.toLowerCase().startsWith(state.filter);
    switch (action.type) {
        case 'cities/fetch-all': {// payload guarda un array con todas las ciudades
            const allCities = action.payload.sort((leftCity, rightCity) => leftCity._id.localeCompare(rightCity._id)); // guarda un array con todos los objetos ciudad o sea cada objeto es una ciudad 
            const filteredCities = state.filter === '' ? allCities : allCities.filter(citiesByNameStartsWith);
            return {
                ...state,
                allCitiesReady: true,
                allCities,
                filteredCities,
            };
        }

        case 'cities/fetch-one': { // payload guarda un objeto con todos los datos de la ciudad que se buscó
            return {
                ...state,
                cityReady: true,
                city: action.payload
            };
        }

        case 'cities/delete': {//payload guarda un objeto con todos los datos de la ciudad que se borró
            const allCities = state.allCities.filter(city => city._id !== action.payload._id);
            const filteredCities = state.filter === '' ? allCities : allCities.filter(citiesByNameStartsWith);
            return {
                ...state,
                allCities,
                filteredCities,
            }
        }
        case 'cities/insert': {// payload guarda un objeto con todos los datos de la ciudad que se registró
            // const allCities = store.allCities.concat([action.payload]);

            // const allCities = store.allCities.slice();
            // allCities.push(action.payload);

            const allCities = [...state.allCities, action.payload];
            const filteredCities = state.filter === '' ? allCities : allCities.filter(citiesByNameStartsWith);
            return {
                ...state,
                allCities,
                filteredCities,
            }
        }
        case 'cities/filter': {
            const filter = action.payload; // String guarda el nombre de la ciudad que se está buscando 
            const filteredCities = filter === '' ? state.allCities : state.allCities.filter((city) => city.name.toLowerCase().startsWith(filter));
            return {
                ...state,
                filter,
                filteredCities,
            }
        }
        case 'likeDislike': {
            const city = JSON.parse(JSON.stringify(state.city));
            const itinerary = city.itineraries.find(itinerary => itinerary._id === action.payload.itineraryId);
            if (itinerary) {
                itinerary.likes = action.payload.likes;
            }
            return {
                ...state,
                city,
            }
        }
        case 'comment': {
            const city = JSON.parse(JSON.stringify(state.city));
            const itinerary = city.itineraries.find(itinerary => itinerary._id === action.payload.itinerary);
            if (itinerary) {
                itinerary.comments = action.payload.comments;
            }
            return {
                ...state,
                city,
            }
        }
        default:
            // throw new Error("Unknown action");
            return state;
    }
}


export default citiesReducer;