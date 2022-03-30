const Router = require('express').Router();
const passport = require('../config/passport')


const cityController = require('../controllers/cityController');
const itineraryController = require('../controllers/itineraryController');
const activityController = require('../controllers/activityController');
const userControllers = require('../controllers/UserControllers');
const commentControllers = require('../controllers/commentControllers');

const {
    fetchCities,
    fetchCity,
    insertCity,
    modifyCity,
    deleteCity,
} = cityController;

Router.route('/cities').get(fetchCities);
Router.route('/cities/:id').get(fetchCity);
Router.route('/cities').post(insertCity);
Router.route('/cities/:id').put(modifyCity);
Router.route('/cities/:id').delete(deleteCity);



const {
    fetchItineraries,
    fetchItinerary,
    insertItinerary,
    modifyItinerary,
    deleteItinerary,
    likeDislike,
} = itineraryController;
const { addComment, modifyComment, deleteComment } = commentControllers;

////////ITINERARIES ROUTES/////////
Router.route('/itineraries/comment')
    .post(passport.authenticate('jwt', { session: false }), addComment)
    .put(passport.authenticate('jwt', { session: false }), modifyComment)

Router.route('/itineraries/comment/:id')
    .post(passport.authenticate('jwt', { session: false }), deleteComment)
////////////

/////LIKE/////
Router.route("/itineraries/like/:id")
    .put(passport.authenticate("jwt", { session: false }), likeDislike)
///////

Router.route('/itineraries').get(fetchItineraries);
Router.route('/itineraries/:id').get(fetchItinerary);
Router.route('/itineraries').post(insertItinerary);
Router.route('/itineraries/:id').put(modifyItinerary);
Router.route('/itineraries/:id').delete(deleteItinerary);

const {
    fetchActivities,
    fetchActivity,
    insertActivity,
    modifyActivity,
    deleteActivity,
} = activityController;

Router.route('/activities').get(fetchActivities);
Router.route('/activities/:id').get(fetchActivity);
Router.route('/activities').post(insertActivity);
Router.route('/activities/:id').put(modifyActivity);
Router.route('/activities/:id').delete(deleteActivity);


const { signUpUsers, signInUser, signOutUser, verifyEmail, verificarToken } = userControllers;
const validator = require('../config/validator')

Router.route('/auth/signup').post(validator, signUpUsers)
Router.route('/auth/signin').post(signInUser)
Router.route('/auth/signout').post(signOutUser)

Router.route('/verify/:uniqueString') //RECIBE EL LINK DE USUARIO
    .get(verifyEmail)


Router.route('/auth/signInToken')
    .get(passport.authenticate('jwt', { session: false }), verificarToken)



module.exports = Router;