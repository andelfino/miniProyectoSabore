package com.sabore.dto;

import java.math.BigDecimal;

public record PedidoResponse(
        Long id,
        Long usuarioId,
        String usuarioNombre,
        Long platoId,
        String platoNombre,
        BigDecimal platoPrecio,
        String estado
) {
}
