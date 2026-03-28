import { useState, useEffect, useCallback } from "react";
import { platosService } from "../services/platos";

export function usePlatos() {
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await platosService.listar();
      setPlatos(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { platos, cargando, error, recargar: cargar };
}
