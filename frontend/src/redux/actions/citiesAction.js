import api from '../../api';

const citiesAction = {
    fetchCities: () => {
        return async (dispatch, getState) => {
            const response = await api.fetchCities();
            if (response.data.success) {
                dispatch({ type: 'cities/fetch-all', payload: response.data.content.cities });
            }
        }
    },


    fetchCity: (id, loadItineraries = false, loadActivities = false) => { // loadActivities si usa quando loadItin es = true//si ponemos activities true y itin es false se ignora activities
        return async (dispatch, getState) => {
            const responseCity = await api.fetchCity(id);
            if (responseCity.data.success) {
                const city = responseCity.data.content.city;
                if (loadItineraries) { // se vogliamo cargar los itinerarios
                    city.itineraries = [];
                    const responseItineraries = await api.fetchItineraries({ city: id });
                    if (responseItineraries.data.success) {
                        city.itineraries = responseItineraries.data.content.itineraries;
                        if (loadActivities) {
                            //------------ACTIVITIES FOR EACH ITINERARY----------/////
                            city.itineraries.forEach(async (itinerary) => {
                                itinerary.activities = [];
                                const responseActivities = await api.fetchActivities({ itinerary: itinerary._id });
                                if (responseActivities.data.success) {
                                    itinerary.activities = responseActivities.data.content.activities;
                                }
                            })
                        }
                    }
                }
                dispatch({ type: 'cities/fetch-one', payload: city });
            }
        }
    },

    filterCities: (filter) => {
        return async (dispatch, getState) => {
            dispatch({ type: 'cities/filter', payload: filter });
        }
    }
};

export default citiesAction;