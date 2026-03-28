import { api } from "./api";

const ENDPOINT = "/api/pedidos";

export const pedidosService = {
  listar: () => api.get(ENDPOINT),
  registrar: (pedido) => api.post(ENDPOINT, pedido),
  actualizarEstado: (id, estado) =>
    api.patch(`${ENDPOINT}/${id}/estado`, { estado }),
};
