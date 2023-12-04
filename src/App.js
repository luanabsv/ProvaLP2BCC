import store from "./redux/store.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";//componente
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagina from "./templates/Pagina.jsx";
import BatePapo from "./Telas/BatePapo.jsx";
import CadastroUsuario from "./Telas/CadastroUsuario.jsx";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter> 
          <Routes>
            <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
            <Route path="/batepapo" element={<BatePapo />} />
            <Route path="/" element={<Pagina />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
