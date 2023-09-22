import { combineReducers } from "@reduxjs/toolkit";
import { pokeApi } from "./api/pokeAPi/api";

export const rootReducer = combineReducers({
    [pokeApi.reducerPath]: pokeApi.reducer,
})