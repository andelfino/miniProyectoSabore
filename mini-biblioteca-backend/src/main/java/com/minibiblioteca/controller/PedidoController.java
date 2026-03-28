package com.minibiblioteca.controller;

import com.minibiblioteca.dto.ActualizarEstadoPedidoRequest;
import com.minibiblioteca.dto.PedidoRequest;
import com.minibiblioteca.dto.PedidoResponse;
import com.minibiblioteca.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public List<PedidoResponse> listar() {
        return pedidoService.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PedidoResponse registrar(@Valid @RequestBody PedidoRequest request) {
        return pedidoService.registrar(request);
    }

    @PatchMapping("/{id}/estado")
    public PedidoResponse actualizarEstado(
            @PathVariable Long id,
            @Valid @RequestBody ActualizarEstadoPedidoRequest request) {
        return pedidoService.actualizarEstado(id, request);
    }
}
