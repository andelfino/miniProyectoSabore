export function EstadoCarga({ cargando, error, vacio, onReintentar }) {
  if (cargando) {
    return (
      <div className="estado-carga">
        <div className="spinner" aria-label="Cargando..." />
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="estado-error">
        <p className="mensaje-error">{error}</p>
        {onReintentar && (
          <button className="btn btn-secundario" onClick={onReintentar}>
            Reintentar
          </button>
        )}
      </div>
    );
  }

  if (vacio) {
    return (
      <div className="estado-vacio">
        <p>No hay resultados para mostrar.</p>
      </div>
    );
  }

  return null;
}
