import { useEffect } from "react";

export function Modal({ titulo, onCerrar, children }) {
  useEffect(() => {
    const cerrarConEscape = (e) => {
      if (e.key === "Escape") onCerrar();
    };
    document.addEventListener("keydown", cerrarConEscape);
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [onCerrar]);

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__encabezado">
          <h2 className="modal__titulo" id="modal-titulo">
            {titulo}
          </h2>
          <button
            className="modal__cerrar"
            onClick={onCerrar}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <div className="modal__cuerpo">{children}</div>
      </div>
    </div>
  );
}
