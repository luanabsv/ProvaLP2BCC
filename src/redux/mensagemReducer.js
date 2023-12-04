import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from './estado.js';
const urlBase = 'https://backend-bcc-2-b.vercel.app/mensagem';

export const buscarMensagens = createAsyncThunk('mensagem/buscarMensagens', async () => {
    try { 
        const resposta = await fetch(urlBase, { method: 'GET' });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: true,
                listaMensagens: dados.listaMensagens,
                mensagem: ''
            }
        }
        else {
            return {
                status: false,
                listaMensagens: [],
                mensagem: 'Ocorreu um erro ao buscar os usuários da base de dados.'
            }
        }
    } catch (erro) {
        return {
            status: false,
            listaMensagens: [],
            mensagem: 'Ocorreu um erro ao buscar os usuários da base de dados:' + erro.message
        }
    }
});


export const cadastrarMensagem = createAsyncThunk('mensagem/cadastrarMensagens', async (novaMensagem) => {
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaMensagem)
    }).catch(erro => {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao enviar a mensagem:' + erro.message
        }
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            novaMensagem
        }
    }
    else {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao enviar a mensagem.',
            novaMensagem
        }
    }
});

const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    listaMensagens: []
}

const mensagensSlice = createSlice ({
    name: 'listaMensagens',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(cadastrarMensagem.fulfilled, (state, action) => {
            state.estado = ESTADO.OCIOSO;
            state.listaMensagens.push(action.payload.listaMensagens);
            state.mensagem = action.payload.mensagem;
        })
        .addCase(cadastrarMensagem.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Enviando mensagem...";
        })
        .addCase(cadastrarMensagem.rejected, (state, action) => {
            state.mensagem = "Erro ao enviar uma mensagem: " + action.error.message;
            state.estado = ESTADO.ERRO;
        }).addCase(buscarMensagens.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Buscando mensagens...";
        })
        .addCase(buscarMensagens.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.listaMensagens = action.payload.listaMensagens;
            } else {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        .addCase(buscarMensagens.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.error.message;
        })
    }
});
export default mensagensSlice.reducer;