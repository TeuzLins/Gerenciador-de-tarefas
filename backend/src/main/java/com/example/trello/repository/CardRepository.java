package com.example.trello.repository;

import com.example.trello.domain.Card;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByColumnIdOrderByPositionAsc(Long columnId);
}
