package com.example.trello.web;

import com.example.trello.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cards")
public class CardController {
    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PutMapping("/{cardId}/move")
    public ResponseEntity<Void> moveCard(
            @PathVariable Long cardId,
            @RequestBody MoveCardRequest request
    ) {
        cardService.moveCard(cardId, request.destinationColumnId(), request.destinationIndex());
        return ResponseEntity.noContent().build();
    }
}
