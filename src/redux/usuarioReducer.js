import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from './estado.js';
const urlBase = 'https://backend-bcc-2-b.vercel.app/usuario';


export const buscarUsuarios = createAsyncThunk('usuario/buscarUsuario', async () => {
    try { 
        const resposta = await fetch(urlBase, { method: 'GET' });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: true,
                listaUsuarios: dados.listaUsuarioss,
                mensagem: ''
            }
        }
        else {
            return {
                status: false,
                listaUsuarios: [],
                mensagem: 'Ocorreu um erro ao buscar os usuários da base de dados.'
            }
        }
    } catch (erro) {
        return {
            status: false,
            listaUsuarios: [],
            mensagem: 'Ocorreu um erro ao buscar os usuários da base de dados:' + erro.message
        }
    }
});


export const cadastrarUsuario = createAsyncThunk('usuario/cadastrarUsuario', async (usuario) => {
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }).catch(erro => {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao cadastrar o usuário:' + erro.message
        }
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            usuario
        }
    }
    else {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao cadastrar um usuário.',
            usuario
        }
    }
});

const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    listaUsuarios: []
}

const usuarioSlice = createSlice ({
    name: 'usuarios',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(cadastrarUsuario.fulfilled, (state, action) => {
            state.estado = ESTADO.OCIOSO;
            state.usuarios.push(action.payload.usuario);
            state.mensagem = action.payload.mensagem;
        })
        .addCase(cadastrarUsuario.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Cadastrando usuário...";
        })
        .addCase(cadastrarUsuario.rejected, (state, action) => {
            state.mensagem = "Erro ao cadastrar um usuário: " + action.error.message;
            state.estado = ESTADO.ERRO;
        }).addCase(buscarUsuarios.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Buscando usuários...";
        })
        .addCase(buscarUsuarios.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.usuarios = action.payload.listaUsuarios;
            } else {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        .addCase(buscarUsuarios.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.error.message;
        })
    } 
});

export default usuarioSlice.reducer;