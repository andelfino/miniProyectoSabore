package com.sabore.service;

import com.sabore.dto.UsuarioRequest;
import com.sabore.dto.UsuarioResponse;
import com.sabore.entity.Usuario;
import com.sabore.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listar() {
        return usuarioRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional
    public UsuarioResponse crear(UsuarioRequest request) {
        Usuario u = new Usuario();
        u.setNombre(request.nombre().trim());
        u.setEmail(request.email().trim().toLowerCase());
        usuarioRepository.save(u);
        return toResponse(u);
    }

    private UsuarioResponse toResponse(Usuario u) {
        return new UsuarioResponse(u.getId(), u.getNombre(), u.getEmail());
    }
}
