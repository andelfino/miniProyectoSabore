import { useState } from "react";
import { usePlatos } from "../hooks/usePlatos";
import { platosService } from "../services/platos";
import { ListaPlatos } from "../components/ListaPlatos";
import { EstadoCarga } from "../components/EstadoCarga";
import { Modal } from "../components/Modal";
import { FormularioPlato } from "../components/FormularioPlato";

export function PlatosPage() {
  const { platos, cargando, error, recargar } = usePlatos();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorMutacion, setErrorMutacion] = useState(null);

  async function handleCrear(datos) {
    setGuardando(true);
    setErrorMutacion(null);
    try {
      await platosService.crear(datos);
      setModalAbierto(false);
      recargar();
    } catch (err) {
      setErrorMutacion(err.message);
    } finally {
      setGuardando(false);
    }
  }

  async function handleEliminar(id) {
    try {
      await platosService.eliminar(id);
      recargar();
    } catch (err) {
      alert(`No se pudo eliminar el plato: ${err.message}`);
    }
  }

  function handleCerrarModal() {
    if (guardando) return;
    setModalAbierto(false);
    setErrorMutacion(null);
  }

  const mostrarEstado = cargando || error || platos.length === 0;

  return (
    <main className="pagina">
      <div className="pagina__encabezado pagina__encabezado--con-accion">
        <div>
          <h1 className="pagina__titulo">Platos</h1>
          <p className="pagina__subtitulo">Catálogo de platos disponibles</p>
        </div>
        <button
          className="btn btn-primario"
          onClick={() => setModalAbierto(true)}
        >
          + Nuevo plato
        </button>
      </div>

      {mostrarEstado ? (
        <EstadoCarga
          cargando={cargando}
          error={error}
          vacio={!cargando && !error && platos.length === 0}
          onReintentar={recargar}
        />
      ) : (
        <>
          <p className="pagina__conteo">
            {platos.length} plato{platos.length !== 1 ? "s" : ""} en el catálogo
          </p>
          <ListaPlatos platos={platos} onEliminar={handleEliminar} />
        </>
      )}

      {modalAbierto && (
        <Modal titulo="Nuevo plato" onCerrar={handleCerrarModal}>
          {errorMutacion && (
            <p className="campo__mensaje-error campo__mensaje-error--global">
              {errorMutacion}
            </p>
          )}
          <FormularioPlato
            onGuardar={handleCrear}
            onCancelar={handleCerrarModal}
            guardando={guardando}
          />
        </Modal>
      )}
    </main>
  );
}
