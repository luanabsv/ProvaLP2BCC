import { Container, Table, Button  } from "react-bootstrap";
import { buscarUsuarios } from "../redux/usuarioReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function TabelaUsuario(props) {
    const dispatch = useDispatch();


    // const { estado, mensagem, usuarios } = useSelector((state) => state.listaUsuarios);

    // useEffect(() => {
    //     dispatch(buscarUsuarios());
    // }, [dispatch]);


    return (
        <Container>
            <Button variant="primary" 
                onClick={() => {
                    props.setExibirFormulario(true);
                }}>Cadastrar</Button>{' '}

            {/* <Table className="mt-5" striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Nickname</th>
                        <th>urlAvatar</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            usuarios.map((user) => {
                                return (<tr key={user.codigo}>
                                    <td>{user.nickname}</td>
                                    <td>{user.avatarUrl}</td>
                                </tr>)
                            })
                        }
                    </tbody>
            </Table> */}
        </ Container>
    );

}