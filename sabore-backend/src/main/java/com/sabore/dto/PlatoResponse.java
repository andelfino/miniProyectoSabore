package com.sabore.dto;

import java.math.BigDecimal;

public record PlatoResponse(Long id, String nombre, String descripcion, BigDecimal precio) {
}
