package com.sabore.dto;

import jakarta.validation.constraints.NotNull;

public record PedidoRequest(
        @NotNull(message = "usuarioId es obligatorio") Long usuarioId,
        @NotNull(message = "platoId es obligatorio") Long platoId
) {
}
