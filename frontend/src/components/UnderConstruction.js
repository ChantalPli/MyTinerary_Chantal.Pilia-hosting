import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import './styles/UnderConstruction.css';
import { Link } from "react-router-dom"




import "./styles/CallToAction.css";

import api from '../api.js';

export default function UnderConstruction(props) {
    return (
        <Card sx={{ maxWidth: 900 }} className="card_under" >
            <CardMedia
                component="img"
                height="270"
                image={api.url + props.image}
                alt={props.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.children}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link style={{ textDecoration: 'none' }} to="/home">
                    <Button size="small" color="primary">
                        Back to Home
                    </Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/cities">
                    <Button size="small" color="primary">
                        Back to Cities
                    </Button>
                </Link>
            </CardActions>

        </Card>
    );




}