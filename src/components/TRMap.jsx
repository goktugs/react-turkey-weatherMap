import React from 'react';
import TurkeyMap from 'turkey-map-react';
import cities from '../data/cities.json';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLatitude, setLongtitude, setWeather } from '../stores/weatherSlice';

export default function TRMap() {
  const dispatch = useDispatch();
  const latitude = useSelector((state) => state.weather.latitude);
  const longtitude = useSelector((state) => state.weather.longtitude);
  const weather = useSelector((state) => state.weather.weather);

  const handleHover = (event) => {
    let matchingPlateNumber = cities.filter(function (pn) {
      return pn.plaka === event.plateNumber;
    });

    if (matchingPlateNumber.length > 0) {
      let lat = matchingPlateNumber[0].lat;
      let lon = matchingPlateNumber[0].lon;

      dispatch(setLatitude(lat));
      dispatch(setLongtitude(lon));
    }
  };

  useEffect(() => {
    async function fetchWeather() {
      if (latitude & longtitude) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&units=metric&lang=tr&appid=${process.env.REACT_APP_WEATHER_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        dispatch(setWeather(data));
      }
    }

    fetchWeather();
  }, [latitude]);

  return (
    <TurkeyMap
      hoverable={true}
      onHover={handleHover}
      showTooltip={true}
      tooltipText={
        weather
          ? weather.name +
            ' ' +
            weather.main.temp +
            '°C' +
            ' ' +
            weather.weather[0].description +
            ''
          : 'loading....'
      }
      customStyle={{ idleColor: '#333', hoverColor: '#fff' }}
    />
  );
}
