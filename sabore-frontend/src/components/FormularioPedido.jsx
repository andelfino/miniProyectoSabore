import { useState, useEffect } from "react";
import { usuariosService } from "../services/usuarios";
import { platosService } from "../services/platos";
import { formatearPrecio } from "../utils/formatear";

const VACIO = { usuarioId: "", platoId: "" };

export function FormularioPedido({ onGuardar, onCancelar, guardando }) {
  const [campos, setCampos] = useState(VACIO);
  const [errores, setErrores] = useState({});

  const [usuarios, setUsuarios] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [cargandoOpciones, setCargandoOpciones] = useState(true);
  const [errorOpciones, setErrorOpciones] = useState(null);

  useEffect(() => {
    async function cargarOpciones() {
      setCargandoOpciones(true);
      setErrorOpciones(null);
      try {
        const [todosUsuarios, todosPlatos] = await Promise.all([
          usuariosService.listar(),
          platosService.listar(),
        ]);
        setUsuarios(todosUsuarios);
        setPlatos(todosPlatos);
      } catch {
        setErrorOpciones("No se pudieron cargar usuarios o platos. Reintentá más tarde.");
      } finally {
        setCargandoOpciones(false);
      }
    }
    cargarOpciones();
  }, []);

  function actualizar(e) {
    const { name, value } = e.target;
    setCampos((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: null }));
  }

  function validar() {
    const nuevosErrores = {};
    if (!campos.usuarioId) nuevosErrores.usuarioId = "Seleccioná un usuario.";
    if (!campos.platoId) nuevosErrores.platoId = "Seleccioná un plato.";
    return nuevosErrores;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nuevosErrores = validar();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    onGuardar({
      usuarioId: Number(campos.usuarioId),
      platoId: Number(campos.platoId),
    });
  }

  if (cargandoOpciones) {
    return (
      <div className="formulario-cargando">
        <div className="spinner" aria-label="Cargando opciones..." />
        <p>Cargando usuarios y platos...</p>
      </div>
    );
  }

  if (errorOpciones) {
    return (
      <div className="estado-error">
        <p className="mensaje-error">{errorOpciones}</p>
        <button className="btn btn-secundario" onClick={onCancelar}>
          Cerrar
        </button>
      </div>
    );
  }

  const sinUsuarios = usuarios.length === 0;
  const sinPlatos = platos.length === 0;

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      {sinUsuarios && (
        <p className="campo__mensaje-error campo__mensaje-error--global">
          No hay usuarios registrados. Registrá uno primero.
        </p>
      )}
      {sinPlatos && (
        <p className="campo__mensaje-error campo__mensaje-error--global">
          No hay platos disponibles. Agregá uno primero.
        </p>
      )}

      <div className="campo">
        <label className="campo__etiqueta" htmlFor="usuarioId">
          Usuario <span className="campo__requerido">*</span>
        </label>
        <select
          id="usuarioId"
          name="usuarioId"
          className={`campo__input campo__select ${errores.usuarioId ? "campo__input--error" : ""}`}
          value={campos.usuarioId}
          onChange={actualizar}
          disabled={guardando || sinUsuarios}
        >
          <option value="">— Seleccioná un usuario —</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre} ({u.email})
            </option>
          ))}
        </select>
        {errores.usuarioId && <p className="campo__mensaje-error">{errores.usuarioId}</p>}
      </div>

      <div className="campo">
        <label className="campo__etiqueta" htmlFor="platoId">
          Plato <span className="campo__requerido">*</span>
        </label>
        <select
          id="platoId"
          name="platoId"
          className={`campo__input campo__select ${errores.platoId ? "campo__input--error" : ""}`}
          value={campos.platoId}
          onChange={actualizar}
          disabled={guardando || sinPlatos}
        >
          <option value="">— Seleccioná un plato —</option>
          {platos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} — {formatearPrecio(p.precio)}
            </option>
          ))}
        </select>
        {errores.platoId && <p className="campo__mensaje-error">{errores.platoId}</p>}
      </div>

      <div className="formulario__acciones">
        <button
          type="button"
          className="btn btn-secundario"
          onClick={onCancelar}
          disabled={guardando}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primario"
          disabled={guardando || sinUsuarios || sinPlatos}
        >
          {guardando ? "Registrando..." : "Registrar pedido"}
        </button>
      </div>
    </form>
  );
}
