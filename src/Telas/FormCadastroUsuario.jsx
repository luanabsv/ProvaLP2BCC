// import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { cadastrarUsuario } from '../redux/usuarioReducer';
import { useState } from 'react';

// const [validaForm, setvalidaForm] = useState(false);
export default function FormCadUsuario(props) {
    const dispatch = useDispatch();

    const usuarioInicial = {
        nickname: '',
        urlAvatar: ''
    }

    const [usuario, setUsuario] = useState(usuarioInicial);

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setUsuario({ ...usuario, [componente.name]: componente.value });
    }

    function submitForm(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            dispatch(cadastrarUsuario(usuario))
            alert('Usuário cadastrado com sucesso');
            props.setExibirFormulario(false);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <Container className="mt-5">
            <Form onSubmit={submitForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control type="text" placeholder="Digite seu nickname" id="nickname" name="nickname"  onChange={manipularMudancas}/>
                    
                </Form.Group>
            
                <Form.Group className="mb-3">
                    <Form.Label>Url Avatar</Form.Label>
                    <Form.Control type="text" placeholder="informe a url do seu avatar" id="urlAvatar" name="urlAvatar" onChange={manipularMudancas}/>
                </Form.Group>
            
                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
                <Button className="ms-4" variant="primary" type="button"   onClick={() => {
                    props.setExibirFormulario(false);
                }}>
                    Voltar
                </Button>
            </Form>
        </ Container>
      );
}