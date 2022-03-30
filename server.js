require('dotenv').config();
require('./config/database');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const passport = require('passport');



const cities = require('./cities.json');

//const port = 4000;
const app = express();

const path = require('path');


// app.use(cors({
//     origin: 'https://mytinerary-chantal.herokuapp.com'
// }));

app.use(cors({
    AccessControlAllowOrigin: 'https://mytinerary-chantal.herokuapp.com'
}));



app.use(express.json()); //para recibir la solicitud en formato json !!!!!!

app.use('/api', routes);

app.use('/images', express.static('./images'));
app.use('/avatars', express.static('./avatars'));
app.use(passport.initialize())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
    });
}

app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0', () => console.log(`server ready on PORT + ${process.env.PORT || 4000}`))



// app.listen(port, () => console.log('Server started'));


/*****************************************************************/

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// // const cities = require('./cities.json');

// const port = 4000;
// const app = express();

// // const express = require('express')
// // const PORT = 4000
// // const app = express()

// require('dotenv').config();
// require('./config/database');

// /////////////////////////////////////////

// const citySchema = new mongoose.Schema({
//     name: String,
//     description: String,
//     image: String,
// });

// const City = new mongoose.model('cities', citySchema);

// /////////////////////////////////////////

// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

// app.get('/api/cities', async (request, response) => {
//     const cities = await City.find();
//     response.send(cities);
// });

// app.use('/images', express.static('./images'));

// /////////////////////////////////////////

// app.listen(port, () => console.log('Server started'));

// // app.listen(PORT, () => console.log('server ready on port ' + PORT))