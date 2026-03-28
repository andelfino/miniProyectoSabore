package com.minibiblioteca.service;

import com.minibiblioteca.dto.ActualizarEstadoPedidoRequest;
import com.minibiblioteca.dto.PedidoRequest;
import com.minibiblioteca.dto.PedidoResponse;
import com.minibiblioteca.entity.EstadoPedido;
import com.minibiblioteca.entity.Pedido;
import com.minibiblioteca.entity.Plato;
import com.minibiblioteca.entity.Usuario;
import com.minibiblioteca.exception.NegocioException;
import com.minibiblioteca.repository.PedidoRepository;
import com.minibiblioteca.repository.PlatoRepository;
import com.minibiblioteca.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PlatoRepository platoRepository;

    public PedidoService(
            PedidoRepository pedidoRepository,
            UsuarioRepository usuarioRepository,
            PlatoRepository platoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.usuarioRepository = usuarioRepository;
        this.platoRepository = platoRepository;
    }

    @Transactional(readOnly = true)
    public List<PedidoResponse> listar() {
        return pedidoRepository.findAllWithUsuarioYPlato().stream().map(this::toResponse).toList();
    }

    @Transactional
    public PedidoResponse registrar(PedidoRequest request) {
        Usuario usuario = usuarioRepository.findById(request.usuarioId())
                .orElseThrow(() -> new NegocioException("No existe el usuario con id " + request.usuarioId()));
        Plato plato = platoRepository.findById(request.platoId())
                .orElseThrow(() -> new NegocioException("No existe el plato con id " + request.platoId()));

        Pedido p = new Pedido();
        p.setUsuario(usuario);
        p.setPlato(plato);
        p.setEstado(EstadoPedido.PENDIENTE);

        pedidoRepository.save(p);
        return toResponse(p);
    }

    @Transactional
    public PedidoResponse actualizarEstado(Long id, ActualizarEstadoPedidoRequest request) {
        Pedido pedido = pedidoRepository.findByIdWithUsuarioYPlato(id)
                .orElseThrow(() -> new NegocioException("No existe el pedido con id " + id));

        validarTransicion(pedido.getEstado(), request.estado());
        pedido.setEstado(request.estado());
        pedidoRepository.save(pedido);
        return toResponse(pedido);
    }

    private void validarTransicion(EstadoPedido estadoActual, EstadoPedido nuevoEstado) {
        boolean valida = switch (estadoActual) {
            case PENDIENTE -> nuevoEstado == EstadoPedido.CONFIRMADO;
            case CONFIRMADO -> nuevoEstado == EstadoPedido.ENTREGADO;
            case ENTREGADO -> false;
        };
        if (!valida) {
            throw new NegocioException(
                    "Transición inválida: no se puede pasar de " + estadoActual + " a " + nuevoEstado);
        }
    }

    private PedidoResponse toResponse(Pedido p) {
        return new PedidoResponse(
                p.getId(),
                p.getUsuario().getId(),
                p.getUsuario().getNombre(),
                p.getPlato().getId(),
                p.getPlato().getNombre(),
                p.getPlato().getPrecio(),
                p.getEstado().name());
    }
}
