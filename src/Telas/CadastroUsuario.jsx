import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import { useState } from "react";
import FormCadUsuario from "./FormCadastroUsuario.jsx";
import TabelaUsuario from "./TabelaUsuario";

export default function CadastroUsuario(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);

    return (
        <Container>
            <Pagina>
                {
                   exibirFormulario ?  <FormCadUsuario 
                    exibirFormulario={exibirFormulario}
                    setExibirFormulario={setExibirFormulario} />
                    :
                    <TabelaUsuario   exibirFormulario={exibirFormulario}
                    setExibirFormulario={setExibirFormulario} />
                }
                
            </Pagina>
        </Container>
    )
}