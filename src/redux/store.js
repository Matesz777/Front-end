import { configureStore } from '@reduxjs/toolkit';
import changeunits from './changeunits';
import lastSeenWeatherReducer from './weatherSlice';

export default configureStore({
    reducer: {
        units : changeunits
        , weather : lastSeenWeatherReducer
    }
})