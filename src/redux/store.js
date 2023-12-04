import { configureStore } from '@reduxjs/toolkit';
import mensagensSlice from './mensagemReducer.js'
import usuarioReducer from './usuarioReducer.js';

const store = configureStore({
    reducer:{
        usuario: usuarioReducer,
        mensagens: mensagensSlice
    }
});

export default store;