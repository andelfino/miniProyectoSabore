import { useState } from "react";
import { useUsuarios } from "../hooks/useUsuarios";
import { usuariosService } from "../services/usuarios";
import { ListaUsuarios } from "../components/ListaUsuarios";
import { EstadoCarga } from "../components/EstadoCarga";
import { Modal } from "../components/Modal";
import { FormularioUsuario } from "../components/FormularioUsuario";

export function UsuariosPage() {
  const { usuarios, cargando, error, recargar } = useUsuarios();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorMutacion, setErrorMutacion] = useState(null);

  async function handleCrear(datos) {
    setGuardando(true);
    setErrorMutacion(null);
    try {
      await usuariosService.crear(datos);
      setModalAbierto(false);
      recargar();
    } catch (err) {
      setErrorMutacion(err.message);
    } finally {
      setGuardando(false);
    }
  }

  function handleCerrarModal() {
    if (guardando) return;
    setModalAbierto(false);
    setErrorMutacion(null);
  }

  const mostrarEstado = cargando || error || usuarios.length === 0;

  return (
    <main className="pagina">
      <div className="pagina__encabezado pagina__encabezado--con-accion">
        <div>
          <h1 className="pagina__titulo">Usuarios</h1>
          <p className="pagina__subtitulo">Usuarios registrados en el sistema</p>
        </div>
        <button
          className="btn btn-primario"
          onClick={() => setModalAbierto(true)}
        >
          + Nuevo usuario
        </button>
      </div>

      {mostrarEstado ? (
        <EstadoCarga
          cargando={cargando}
          error={error}
          vacio={!cargando && !error && usuarios.length === 0}
          onReintentar={recargar}
        />
      ) : (
        <>
          <p className="pagina__conteo">
            {usuarios.length} usuario{usuarios.length !== 1 ? "s" : ""} registrado{usuarios.length !== 1 ? "s" : ""}
          </p>
          <ListaUsuarios usuarios={usuarios} />
        </>
      )}

      {modalAbierto && (
        <Modal titulo="Nuevo usuario" onCerrar={handleCerrarModal}>
          {errorMutacion && (
            <p className="campo__mensaje-error campo__mensaje-error--global">
              {errorMutacion}
            </p>
          )}
          <FormularioUsuario
            onGuardar={handleCrear}
            onCancelar={handleCerrarModal}
            guardando={guardando}
          />
        </Modal>
      )}
    </main>
  );
}
