import { useState } from "react";
import { formatearPrecio, truncarTexto } from "../utils/formatear";

export function PlatoCard({ plato, onEliminar }) {
  const [confirmando, setConfirmando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  async function handleEliminar() {
    if (!confirmando) {
      setConfirmando(true);
      return;
    }
    setEliminando(true);
    await onEliminar(plato.id);
    setEliminando(false);
    setConfirmando(false);
  }

  return (
    <article className="plato-card">
      <div className="plato-card__encabezado">
        <h3 className="plato-card__nombre">{plato.nombre}</h3>
        <span className="plato-card__precio">{formatearPrecio(plato.precio)}</span>
      </div>
      <p className="plato-card__descripcion">{truncarTexto(plato.descripcion, 80)}</p>

      {onEliminar && (
        <div className="plato-card__acciones">
          {confirmando ? (
            <>
              <span className="plato-card__confirmar-texto">¿Confirmar?</span>
              <button
                className="btn btn-peligro btn-sm"
                onClick={handleEliminar}
                disabled={eliminando}
              >
                {eliminando ? "Eliminando..." : "Sí, eliminar"}
              </button>
              <button
                className="btn btn-secundario btn-sm"
                onClick={() => setConfirmando(false)}
                disabled={eliminando}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleEliminar}
              aria-label={`Eliminar ${plato.nombre}`}
            >
              Eliminar
            </button>
          )}
        </div>
      )}
    </article>
  );
}
