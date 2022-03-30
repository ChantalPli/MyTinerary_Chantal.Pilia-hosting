import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles/CustomAutoplaySwiper.css";

import { Autoplay, Pagination, Navigation } from "swiper";

import api from '../api.js';

import React, { useEffect } from 'react';

import { connect } from "react-redux";
import citiesAction from "../redux/actions/citiesAction"

function renderSlides(cities, imagesPerSlide = 1) {
  let allImages = cities.map((city, index) =>
    <figure key={"figure-" + index}>
      <img alt={city.name} src={api.url + city.image} />
      <figcaption>{city.name}</figcaption>
    </figure>
  );
  return Array.from({ length: Math.ceil(cities.length / imagesPerSlide) }, (_, index) => {
    let slideImages = allImages.splice(0, imagesPerSlide);
    return (<SwiperSlide key={"slide-" + index}><div>{slideImages}</div></SwiperSlide>);
  });
  // return new Array(Math.ceil(cities.length / imagesPerSlide)).map((_, index) => {
  //   let slideImages = allImages.splice(0, imagesPerSlide);
  //   return (<SwiperSlide key={"slide-" + index}><div>{slideImages}</div></SwiperSlide>);
  // });
}
function CustomAutoplaySwipper(props) {
  // const [cities, setCities] = useState([]);
  const {
    ready, // Indica si la lista de ciudades cargó
    allCities: cities, // Contiene la lista de todas las ciudades
    fetchCities, // funcion que obtiene la lista de ciudades del backend
  } = props;
  useEffect(() => {
    if (!ready)
      fetchCities();
  }, [ready, fetchCities]);
  // useEffect(() => {
  //   api.fetchCities().then(response => {
  //     if (response.data.success) {
  //       setCities(response.data.content.cities.slice(0, 12));
  //     }
  //   });
  // });
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {renderSlides(cities.slice(0, 12), 4)}
    </Swiper>
  );
}

export default connect(state => state.citiesReducer, citiesAction)(CustomAutoplaySwipper);