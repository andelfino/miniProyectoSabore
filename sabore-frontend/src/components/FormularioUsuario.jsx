import { useState } from "react";

const VACIO = { nombre: "", email: "" };

export function FormularioUsuario({ onGuardar, onCancelar, guardando }) {
  const [campos, setCampos] = useState(VACIO);
  const [errores, setErrores] = useState({});

  function actualizar(e) {
    const { name, value } = e.target;
    setCampos((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: null }));
  }

  function validar() {
    const nuevosErrores = {};
    if (!campos.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }
    if (!campos.email.trim()) {
      nuevosErrores.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.trim())) {
      nuevosErrores.email = "Ingresá un email válido.";
    }
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
      nombre: campos.nombre.trim(),
      email: campos.email.trim(),
    });
  }

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      <div className="campo">
        <label className="campo__etiqueta" htmlFor="nombre">
          Nombre completo <span className="campo__requerido">*</span>
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className={`campo__input ${errores.nombre ? "campo__input--error" : ""}`}
          value={campos.nombre}
          onChange={actualizar}
          placeholder="Ej: Ana García"
          disabled={guardando}
        />
        {errores.nombre && (
          <p className="campo__mensaje-error">{errores.nombre}</p>
        )}
      </div>

      <div className="campo">
        <label className="campo__etiqueta" htmlFor="email">
          Email <span className="campo__requerido">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`campo__input ${errores.email ? "campo__input--error" : ""}`}
          value={campos.email}
          onChange={actualizar}
          placeholder="Ej: ana@ejemplo.com"
          disabled={guardando}
        />
        {errores.email && (
          <p className="campo__mensaje-error">{errores.email}</p>
        )}
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
        <button type="submit" className="btn btn-primario" disabled={guardando}>
          {guardando ? "Guardando..." : "Registrar"}
        </button>
      </div>
    </form>
  );
}
