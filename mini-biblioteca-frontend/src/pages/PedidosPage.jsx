import { useState } from "react";
import { usePedidos } from "../hooks/usePedidos";
import { pedidosService } from "../services/pedidos";
import { ListaPedidos } from "../components/ListaPedidos";
import { EstadoCarga } from "../components/EstadoCarga";
import { Modal } from "../components/Modal";
import { FormularioPedido } from "../components/FormularioPedido";

export function PedidosPage() {
  const { pedidos, cargando, error, recargar } = usePedidos();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorMutacion, setErrorMutacion] = useState(null);

  async function handleRegistrar(datos) {
    setGuardando(true);
    setErrorMutacion(null);
    try {
      await pedidosService.registrar(datos);
      setModalAbierto(false);
      recargar();
    } catch (err) {
      setErrorMutacion(err.message);
    } finally {
      setGuardando(false);
    }
  }

  async function handleCambiarEstado(id, estado) {
    try {
      await pedidosService.actualizarEstado(id, estado);
      recargar();
    } catch (err) {
      alert(`No se pudo actualizar el pedido: ${err.message}`);
    }
  }

  function handleCerrarModal() {
    if (guardando) return;
    setModalAbierto(false);
    setErrorMutacion(null);
  }

  const mostrarEstado = cargando || error || pedidos.length === 0;

  return (
    <main className="pagina">
      <div className="pagina__encabezado pagina__encabezado--con-accion">
        <div>
          <h1 className="pagina__titulo">Pedidos</h1>
          <p className="pagina__subtitulo">Gestión de pedidos en curso</p>
        </div>
        <button
          className="btn btn-primario"
          onClick={() => setModalAbierto(true)}
        >
          + Nuevo pedido
        </button>
      </div>

      {mostrarEstado ? (
        <EstadoCarga
          cargando={cargando}
          error={error}
          vacio={!cargando && !error && pedidos.length === 0}
          onReintentar={recargar}
        />
      ) : (
        <>
          <p className="pagina__conteo">
            {pedidos.length} pedido{pedidos.length !== 1 ? "s" : ""} registrado{pedidos.length !== 1 ? "s" : ""}
          </p>
          <ListaPedidos pedidos={pedidos} onCambiarEstado={handleCambiarEstado} />
        </>
      )}

      {modalAbierto && (
        <Modal titulo="Nuevo pedido" onCerrar={handleCerrarModal}>
          {errorMutacion && (
            <p className="campo__mensaje-error campo__mensaje-error--global">
              {errorMutacion}
            </p>
          )}
          <FormularioPedido
            onGuardar={handleRegistrar}
            onCancelar={handleCerrarModal}
            guardando={guardando}
          />
        </Modal>
      )}
    </main>
  );
}
