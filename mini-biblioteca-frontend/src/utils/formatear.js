export function formatearPrecio(precio) {
  if (precio == null) return "—";
  return `$${Number(precio).toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function truncarTexto(texto, maxCaracteres = 60) {
  if (!texto) return "";
  return texto.length > maxCaracteres
    ? texto.slice(0, maxCaracteres) + "…"
    : texto;
}

const LABELS_ESTADO = {
  PENDIENTE: "Pendiente",
  CONFIRMADO: "Confirmado",
  ENTREGADO: "Entregado",
};

export function formatearEstado(estado) {
  return LABELS_ESTADO[estado] ?? estado;
}
