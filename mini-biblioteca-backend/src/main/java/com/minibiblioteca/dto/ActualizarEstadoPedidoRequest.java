package com.minibiblioteca.dto;

import com.minibiblioteca.entity.EstadoPedido;
import jakarta.validation.constraints.NotNull;

public record ActualizarEstadoPedidoRequest(
        @NotNull(message = "El estado es obligatorio") EstadoPedido estado
) {
}
