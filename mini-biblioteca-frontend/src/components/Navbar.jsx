export function Navbar({ paginaActiva, onNavegar }) {
  const links = [
    { id: "pedidos", label: "Pedidos" },
    { id: "platos", label: "Platos" },
    { id: "usuarios", label: "Usuarios" },
  ];

  return (
    <header className="navbar">
      <div className="navbar__marca">
        <span className="navbar__icono" aria-hidden="true">🛵</span>
        <span className="navbar__nombre">Sabore</span>
      </div>
      <nav className="navbar__nav">
        {links.map((link) => (
          <button
            key={link.id}
            className={`navbar__link ${paginaActiva === link.id ? "navbar__link--activo" : ""}`}
            onClick={() => onNavegar(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
