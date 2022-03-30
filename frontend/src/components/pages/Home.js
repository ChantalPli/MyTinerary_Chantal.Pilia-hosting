import HeroImage from '../HeroImage';
import CustomAutoplaySwipper from '../CustomAutoplaySwiper';
import CallToAction from '../CallToAction';

import api from '../../api.js';

export default function Home() {
    return (
        <>
            <HeroImage image={api.url + "/images/sardegna1.jpg"}>
                <h1>FIND YOUR PERFECT TRIP</h1>
                <p>Designed by insiders who know and love their cities!</p>
            </HeroImage>
            <CallToAction />
            <CustomAutoplaySwipper />
        </>
    );
}