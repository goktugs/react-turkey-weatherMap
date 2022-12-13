import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latitude: null,
  longtitude: null,
  weather: null,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setLongtitude: (state, action) => {
      state.longtitude = action.payload;
    },
    setWeather: (state, action) => {
      state.weather = action.payload;
    },
  },
});

export const { setLatitude, setLongtitude, setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
