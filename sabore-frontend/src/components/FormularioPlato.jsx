import { useState } from "react";

const VACIO = { nombre: "", descripcion: "", precio: "" };

export function FormularioPlato({ valorInicial, onGuardar, onCancelar, guardando }) {
  const [campos, setCampos] = useState(valorInicial ?? VACIO);
  const [errores, setErrores] = useState({});

  function actualizar(e) {
    const { name, value } = e.target;
    setCampos((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: null }));
  }

  function validar() {
    const nuevosErrores = {};
    if (!campos.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!campos.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
    const precioNum = parseFloat(campos.precio);
    if (!campos.precio || isNaN(precioNum)) {
      nuevosErrores.precio = "El precio es obligatorio.";
    } else if (precioNum <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a cero.";
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
      descripcion: campos.descripcion.trim(),
      precio: parseFloat(parseFloat(campos.precio).toFixed(2)),
    });
  }

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      <div className="campo">
        <label className="campo__etiqueta" htmlFor="nombre">
          Nombre <span className="campo__requerido">*</span>
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className={`campo__input ${errores.nombre ? "campo__input--error" : ""}`}
          value={campos.nombre}
          onChange={actualizar}
          placeholder="Ej: Pizza muzzarella"
          disabled={guardando}
        />
        {errores.nombre && <p className="campo__mensaje-error">{errores.nombre}</p>}
      </div>

      <div className="campo">
        <label className="campo__etiqueta" htmlFor="descripcion">
          Descripción <span className="campo__requerido">*</span>
        </label>
        <input
          id="descripcion"
          name="descripcion"
          type="text"
          className={`campo__input ${errores.descripcion ? "campo__input--error" : ""}`}
          value={campos.descripcion}
          onChange={actualizar}
          placeholder="Ej: Masa crocante con salsa y queso"
          disabled={guardando}
        />
        {errores.descripcion && <p className="campo__mensaje-error">{errores.descripcion}</p>}
      </div>

      <div className="campo">
        <label className="campo__etiqueta" htmlFor="precio">
          Precio <span className="campo__requerido">*</span>
        </label>
        <input
          id="precio"
          name="precio"
          type="number"
          min="0.01"
          step="0.01"
          className={`campo__input ${errores.precio ? "campo__input--error" : ""}`}
          value={campos.precio}
          onChange={actualizar}
          placeholder="Ej: 1500.00"
          disabled={guardando}
        />
        {errores.precio && <p className="campo__mensaje-error">{errores.precio}</p>}
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
          {guardando ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}
