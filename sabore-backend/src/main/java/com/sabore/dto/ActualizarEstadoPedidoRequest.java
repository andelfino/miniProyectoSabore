package com.sabore.dto;

import com.sabore.entity.EstadoPedido;
import jakarta.validation.constraints.NotNull;

public record ActualizarEstadoPedidoRequest(
        @NotNull(message = "El estado es obligatorio") EstadoPedido estado
) {
}
