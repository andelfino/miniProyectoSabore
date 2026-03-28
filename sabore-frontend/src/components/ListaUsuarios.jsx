import { UsuarioCard } from "./UsuarioCard";

export function ListaUsuarios({ usuarios }) {
  return (
    <div className="lista-usuarios">
      {usuarios.map((usuario) => (
        <UsuarioCard key={usuario.id} usuario={usuario} />
      ))}
    </div>
  );
}
