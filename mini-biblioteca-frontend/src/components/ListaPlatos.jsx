import { PlatoCard } from "./PlatoCard";

export function ListaPlatos({ platos, onEliminar }) {
  return (
    <div className="lista-platos">
      {platos.map((plato) => (
        <PlatoCard key={plato.id} plato={plato} onEliminar={onEliminar} />
      ))}
    </div>
  );
}
