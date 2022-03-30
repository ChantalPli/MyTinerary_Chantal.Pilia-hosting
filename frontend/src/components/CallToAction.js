import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

import "./styles/CallToAction.css";

import api from '../api.js';

export default function CallToAction() {
    return (
        <Card>
            <CardActionArea sx={{ width: 800, margin: '16px auto' }}>
                <CardMedia
                    component="img"
                    height="180"
                    image={api.url + "/images/italy4.jpg"}
                    alt="italy"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        The Best Travel Destinations
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        We’ve done all the prep. All you have to do is pack. Everything you need for an incredible vacation is part of the price. This includes your flight, a stay at an amazing, all-inclusive resort, private hotel transfers, and even awesome extras like excursions or special resort amenities. It’s everything you need for a perfect getaway at the perfect price.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="small" color="primary">
                    <Link to="/cities" className='callto'>
                        Discover More!
                    </Link>
                </Button>
            </CardActions>
        </Card>
    );
}