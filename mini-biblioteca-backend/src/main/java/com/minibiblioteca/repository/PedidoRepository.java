package com.minibiblioteca.repository;

import com.minibiblioteca.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    boolean existsByPlato_Id(Long platoId);

    @Query("SELECT p FROM Pedido p JOIN FETCH p.usuario JOIN FETCH p.plato ORDER BY p.id DESC")
    List<Pedido> findAllWithUsuarioYPlato();

    @Query("SELECT p FROM Pedido p JOIN FETCH p.usuario JOIN FETCH p.plato WHERE p.id = :id")
    Optional<Pedido> findByIdWithUsuarioYPlato(Long id);
}
