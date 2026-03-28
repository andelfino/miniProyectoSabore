import { PedidoCard } from "./PedidoCard";

export function ListaPedidos({ pedidos, onCambiarEstado }) {
  return (
    <div className="lista-pedidos">
      {pedidos.map((pedido) => (
        <PedidoCard key={pedido.id} pedido={pedido} onCambiarEstado={onCambiarEstado} />
      ))}
    </div>
  );
}
