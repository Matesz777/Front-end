import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weatherHistory: JSON.parse(localStorage.getItem("weatherHistory")) || [],
    faworiteWeather: JSON.parse(localStorage.getItem("faworiteWeather")) || [],
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        addWeather: (state, action) => {
            const lastitem = state.weatherHistory[state.weatherHistory.length - 1];
            const newId = lastitem ? lastitem.id + 1 : 1;

            const newWeather = {
                ...action.payload,
                id: newId,
            }

            state.weatherHistory.push(newWeather);
            localStorage.setItem("weatherHistory", JSON.stringify(state.weatherHistory));

            if (state.weatherHistory.length >= 4){
                state.weatherHistory.shift();
            }
            console.log("Id: ",newId);
        },
        addWeatherToFavorite: (state, action) => {
            const lastitem = state.faworiteWeather[state.faworiteWeather.length - 1];
            const newFavId = lastitem ? lastitem.id + 1 : 1;

            const favoriteWeatherobj = {
                ...action.payload,
                id: newFavId,
            }
            state.faworiteWeather.push(favoriteWeatherobj);
            alert("Added to favorites");
            localStorage.setItem("faworiteWeather", JSON.stringify(state.faworiteWeather));
        },
        removeWeather: (state, action) => {
            state.faworiteWeather = state.faworiteWeather.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addWeather, addWeatherToFavorite, removeWeather } = weatherSlice.actions;
export default weatherSlice.reducer;