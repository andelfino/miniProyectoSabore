package com.sabore.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UsuarioRequest(
        @NotBlank(message = "El nombre es obligatorio") String nombre,
        @NotBlank @Email(message = "Email inválido") String email
) {
}
