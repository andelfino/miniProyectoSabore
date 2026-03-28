package com.sabore.service;

import com.sabore.dto.PlatoRequest;
import com.sabore.dto.PlatoResponse;
import com.sabore.entity.Plato;
import com.sabore.exception.NegocioException;
import com.sabore.repository.PedidoRepository;
import com.sabore.repository.PlatoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PlatoService {

    private final PlatoRepository platoRepository;
    private final PedidoRepository pedidoRepository;

    public PlatoService(PlatoRepository platoRepository, PedidoRepository pedidoRepository) {
        this.platoRepository = platoRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @Transactional(readOnly = true)
    public List<PlatoResponse> listar() {
        return platoRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional
    public PlatoResponse crear(PlatoRequest request) {
        Plato p = new Plato();
        aplicarDatos(p, request);
        platoRepository.save(p);
        return toResponse(p);
    }

    @Transactional
    public PlatoResponse actualizar(Long id, PlatoRequest request) {
        Plato p = platoRepository.findById(id)
                .orElseThrow(() -> new NegocioException("No existe el plato con id " + id));
        aplicarDatos(p, request);
        platoRepository.save(p);
        return toResponse(p);
    }

    @Transactional
    public void eliminar(Long id) {
        Plato p = platoRepository.findById(id)
                .orElseThrow(() -> new NegocioException("No existe el plato con id " + id));
        if (pedidoRepository.existsByPlato_Id(id)) {
            throw new NegocioException("No se puede eliminar el plato porque tiene pedidos registrados");
        }
        platoRepository.delete(p);
    }

    private void aplicarDatos(Plato p, PlatoRequest request) {
        p.setNombre(request.nombre().trim());
        p.setDescripcion(request.descripcion().trim());
        p.setPrecio(request.precio());
    }

    private PlatoResponse toResponse(Plato p) {
        return new PlatoResponse(p.getId(), p.getNombre(), p.getDescripcion(), p.getPrecio());
    }
}
