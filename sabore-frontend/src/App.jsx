import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { PlatosPage } from "./pages/PlatosPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import { PedidosPage } from "./pages/PedidosPage";

const PAGINAS = {
  platos: PlatosPage,
  usuarios: UsuariosPage,
  pedidos: PedidosPage,
};

function App() {
  const [paginaActiva, setPaginaActiva] = useState("pedidos");

  const PaginaActual = PAGINAS[paginaActiva] ?? PedidosPage;

  return (
    <div className="layout">
      <Navbar paginaActiva={paginaActiva} onNavegar={setPaginaActiva} />
      <div className="layout__contenido">
        <PaginaActual />
      </div>
    </div>
  );
}

export default App;
