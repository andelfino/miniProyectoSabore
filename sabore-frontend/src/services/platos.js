import { api } from "./api";

const ENDPOINT = "/api/platos";

export const platosService = {
  listar: () => api.get(ENDPOINT),
  crear: (plato) => api.post(ENDPOINT, plato),
  actualizar: (id, plato) => api.put(`${ENDPOINT}/${id}`, plato),
  eliminar: (id) => api.delete(`${ENDPOINT}/${id}`),
};
