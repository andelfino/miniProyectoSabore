package com.minibiblioteca.controller;

import com.minibiblioteca.dto.PlatoRequest;
import com.minibiblioteca.dto.PlatoResponse;
import com.minibiblioteca.service.PlatoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/platos")
public class PlatoController {

    private final PlatoService platoService;

    public PlatoController(PlatoService platoService) {
        this.platoService = platoService;
    }

    @GetMapping
    public List<PlatoResponse> listar() {
        return platoService.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PlatoResponse crear(@Valid @RequestBody PlatoRequest request) {
        return platoService.crear(request);
    }

    @PutMapping("/{id}")
    public PlatoResponse actualizar(@PathVariable Long id, @Valid @RequestBody PlatoRequest request) {
        return platoService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        platoService.eliminar(id);
    }
}
