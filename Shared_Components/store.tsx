import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import buttonActionSlice from "../Redux/redux/slices/buttonActionSlice";
import ScreenSettingsSlice from "../Redux/redux/slices/ScreenSettingsSlice";
import FetchSlice from '../Redux/redux/slices/fetchSlice'

const store: any = configureStore({
    reducer:{
        buttonAction: buttonActionSlice,
        screenAction: ScreenSettingsSlice,
        dataStore: FetchSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store