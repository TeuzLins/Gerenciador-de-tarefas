package com.example.trello.repository;

import com.example.trello.domain.Column;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColumnRepository extends JpaRepository<Column, Long> {
    List<Column> findByBoardIdOrderByPositionAsc(Long boardId);
}
