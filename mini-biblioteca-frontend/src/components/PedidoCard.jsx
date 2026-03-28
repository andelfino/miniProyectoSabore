import { useState } from "react";
import { formatearEstado, formatearPrecio } from "../utils/formatear";

const SIGUIENTE_ESTADO = {
  PENDIENTE: { estado: "CONFIRMADO", label: "Confirmar pedido" },
  CONFIRMADO: { estado: "ENTREGADO", label: "Marcar como entregado" },
  ENTREGADO: null,
};

const CLASE_BADGE_ESTADO = {
  PENDIENTE: "badge badge--pendiente",
  CONFIRMADO: "badge badge--confirmado",
  ENTREGADO: "badge badge--entregado",
};

export function PedidoCard({ pedido, onCambiarEstado }) {
  const [actualizando, setActualizando] = useState(false);
  const siguiente = SIGUIENTE_ESTADO[pedido.estado];

  async function handleAvanzar() {
    if (!siguiente || actualizando) return;
    setActualizando(true);
    try {
      await onCambiarEstado(pedido.id, siguiente.estado);
    } finally {
      setActualizando(false);
    }
  }

  return (
    <article className="pedido-card">
      <div className="pedido-card__encabezado">
        <div className="pedido-card__plato">
          <span className="pedido-card__icono" aria-hidden="true">🍽️</span>
          <span className="pedido-card__nombre-plato">{pedido.platoNombre}</span>
        </div>
        <span className={CLASE_BADGE_ESTADO[pedido.estado]}>
          {formatearEstado(pedido.estado)}
        </span>
      </div>

      <div className="pedido-card__detalle">
        <div className="pedido-card__fila">
          <span className="pedido-card__etiqueta">Usuario</span>
          <span className="pedido-card__valor">{pedido.usuarioNombre}</span>
        </div>
        <div className="pedido-card__fila">
          <span className="pedido-card__etiqueta">Precio</span>
          <span className="pedido-card__valor pedido-card__precio">
            {formatearPrecio(pedido.platoPrecio)}
          </span>
        </div>
        <div className="pedido-card__fila">
          <span className="pedido-card__etiqueta">Pedido #</span>
          <span className="pedido-card__valor">{pedido.id}</span>
        </div>
      </div>

      {siguiente && (
        <div className="pedido-card__accion">
          <button
            className={`btn btn-sm btn-estado btn-estado--${pedido.estado.toLowerCase()}`}
            onClick={handleAvanzar}
            disabled={actualizando}
          >
            {actualizando ? "Actualizando..." : siguiente.label}
          </button>
        </div>
      )}

      {pedido.estado === "ENTREGADO" && (
        <div className="pedido-card__accion">
          <span className="pedido-card__entregado">✓ Pedido completado</span>
        </div>
      )}
    </article>
  );
}
