export function UsuarioCard({ usuario }) {
  const iniciales = usuario.nombre
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <article className="usuario-card">
      <div className="usuario-card__avatar" aria-hidden="true">
        {iniciales}
      </div>
      <div className="usuario-card__datos">
        <h3 className="usuario-card__nombre">{usuario.nombre}</h3>
        <p className="usuario-card__email">{usuario.email}</p>
      </div>
    </article>
  );
}
