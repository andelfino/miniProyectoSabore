import { useState, useEffect, useCallback } from "react";
import { pedidosService } from "../services/pedidos";

export function usePedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await pedidosService.listar();
      setPedidos(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { pedidos, cargando, error, recargar: cargar };
}
