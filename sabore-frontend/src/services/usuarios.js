import { api } from "./api";

const ENDPOINT = "/api/usuarios";

export const usuariosService = {
  listar: () => api.get(ENDPOINT),
  crear: (usuario) => api.post(ENDPOINT, usuario),
};
