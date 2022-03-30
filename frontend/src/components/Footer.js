import './styles/Footer.css';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';


export default function Footer() {
    return (
        <footer>
            <section>
                <h4>MyItinerary</h4>
                <InstagramIcon />
                <FacebookIcon />
                <WhatsAppIcon />
                <TwitterIcon />
            </section>
            <section>
                <h5>Links</h5>
                <ul>
                    <li><Link style={{ textDecoration: 'none', color: 'black' }} to="/home">Home</Link></li>
                    <li><Link style={{ textDecoration: 'none', color: 'black' }} to="/cities">Cities</Link></li>
                </ul>
            </section>
            <section>
                <h5>Contact</h5>
                <ul>
                    <li><MailOutlineIcon /> info@example.com</li>
                    <li><HomeIcon /> New York, NY 10012, US</li>
                    <li><PhoneIcon /> + 01 234 567 88</li>
                </ul>
            </section>
            <section>&copy; 2022 Copyright: MyTinerary.com</section>
        </footer>
    );
}
