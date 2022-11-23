import {configureStore} from '@reduxjs/toolkit';
import rootReducers from './reducer';
import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();
const store = configureStore({
    reducer: rootReducers,
    preloadedState: persistedState
})

store.subscribe(() => {
    saveState({handleCart: store.getState().handleCart});
});


export default store;
