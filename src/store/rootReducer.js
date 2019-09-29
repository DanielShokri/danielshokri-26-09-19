import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { weatherReducer } from './weather/weatherReducer';
import { favoriteReducer } from './favorites/favoritesReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favoriteReducer']
}

const rootReducer = combineReducers({
    weatherReducer,
    favoriteReducer
})

export default persistReducer(persistConfig, rootReducer)